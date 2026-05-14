// ============================================================
//  src/services/api.js
//  SERVICIO DE API: Centraliza todas las llamadas al backend Django.
//  Maneja la lógica de tokens, cabeceras de autorización y errores.
// ============================================================

const BASE_URL = 'https://Cervz.pythonanywhere.com';

// ── HELPERS (Funciones de utilidad interna) ─────────────────────────────────

/**
 * Recupera el JWT (Token) almacenado en el navegador.
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Genera el objeto de cabecera necesario para peticiones protegidas.
 * Usa el estándar 'Bearer Token' que espera Django (SimpleJWT o similar).
 */
function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

/**
 * handleResponse:
 * Procesa la respuesta del servidor. Si hay un error (400, 401, 500), 
 * intenta extraer el mensaje específico del backend para mostrarlo en el frontend.
 */
async function handleResponse(res) {
  // Solo intentamos parsear JSON si hay contenido en la respuesta
  const data = await res.json();
  if (!res.ok) {
    // Buscamos el mensaje de error en diferentes niveles del objeto de respuesta de Django
    const message =
      data?.detail ||
      data?.message ||
      Object.values(data)?.[0]?.[0] || 
      'Error desconocido';
    throw new Error(message);
  }
  return data;
}

// ── AUTH (Gestión de Sesión) ──────────────────────────────────────────────────

/**
 * registrar:
 * Crea un nuevo usuario. Envía los datos como JSON.
 */
export async function registrar(datos) {
  const res = await fetch(`${BASE_URL}/registro/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return handleResponse(res);
}

/**
 * login:
 * Autentica al usuario y guarda el TOKEN y los datos básicos en el localStorage.
 */
export async function login(datos) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  const data = await handleResponse(res);
  
  // Guardamos persistencia para que el usuario no tenga que loguearse al refrescar
  localStorage.setItem('token', data.token);
  localStorage.setItem('usuario', JSON.stringify(data.usuario));
  return data;
}

/**
 * logout:
 * Notifica al backend (opcional) y limpia el almacenamiento local por completo.
 */
export async function logout() {
  const token = getToken();
  if (token) {
    await fetch(`${BASE_URL}/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

/**
 * getUsuarioActual:
 * Devuelve el objeto del usuario logueado (Nombre, ID, etc) parseado desde texto.
 */
export function getUsuarioActual() {
  const raw = localStorage.getItem('usuario');
  return raw ? JSON.parse(raw) : null;
}

/**
 * estaAutenticado:
 * Verifica de forma rápida si existe un token activo.
 */
export function estaAutenticado() {
  return !!getToken();
}

// ── FOTOGRAFÍAS (Gestión de Aportes) ──────────────────────────────────────────

/**
 * subirFotografia:
 * Envía una imagen y su ubicación al servidor.
 * NOTA: Al usar FormData, NO definimos 'Content-Type', ya que el navegador
 * necesita añadir el 'boundary' automáticamente para el manejo de archivos.
 */
export async function subirFotografia(imagen, lugar) {
  const body = new FormData();
  body.append('imagen', imagen); // Archivo binario
  body.append('lugar', lugar);   // Texto descriptivo

  const res = await fetch(`${BASE_URL}/fotos/`, {
    method: 'POST',
    headers: authHeaders(), // Incluye el Token Bearer para saber qué usuario sube la foto
    body,
  });
  return handleResponse(res);
}

/**
 * listarFotografias:
 * Obtiene la lista de fotos del usuario actual desde el endpoint de Django.
 */
export async function listarFotografias() {
  const res = await fetch(`${BASE_URL}/fotos/`, {
    method: 'GET',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

/**
 * eliminarFotografia:
 * Envía una petición DELETE al endpoint específico de la foto (ID).
 */
export async function eliminarFotografia(id) {
  const res = await fetch(`${BASE_URL}/fotos/${id}/`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}