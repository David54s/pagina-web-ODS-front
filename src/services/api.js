// ============================================================
//  src/services/api.js
//  Centraliza todas las llamadas al backend Django
// ============================================================

const BASE_URL = 'http://127.0.0.1:8000';  // Cambia por tu IP si el front corre en otro dispositivo

// ── Helpers ──────────────────────────────────────────────────

function getToken() {
  return localStorage.getItem('token');
}

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    // Lanza el primer mensaje de error que devuelva Django
    const message =
      data?.detail ||
      data?.message ||
      Object.values(data)?.[0]?.[0] ||
      'Error desconocido';
    throw new Error(message);
  }
  return data;
}

// ── Auth ──────────────────────────────────────────────────────

/**
 * Registra un nuevo usuario.
 * @param {{ nombre_completo, correo_electronico, contrasena, terminos_condiciones }} datos
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
 * Inicia sesión.
 * Guarda el token en localStorage automáticamente.
 * @param {{ correo_electronico, contrasena }} datos
 */
export async function login(datos) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  const data = await handleResponse(res);

  // Guardar token y datos del usuario en localStorage
  localStorage.setItem('token', data.token);
  localStorage.setItem('usuario', JSON.stringify(data.usuario));

  return data;
}

/**
 * Cierra sesión.
 * Limpia localStorage automáticamente.
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
 * Devuelve los datos del usuario guardados en localStorage.
 * Retorna null si no hay sesión activa.
 */
export function getUsuarioActual() {
  const raw = localStorage.getItem('usuario');
  return raw ? JSON.parse(raw) : null;
}

/**
 * Indica si hay una sesión activa.
 */
export function estaAutenticado() {
  return !!getToken();
}