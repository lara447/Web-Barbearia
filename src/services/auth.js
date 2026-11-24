const SESSION_KEY = 'barber_find_session';

export function authenticateUser({ identifier, password, role, rememberMe }) {
  const cleanId = identifier.trim();
  if (!cleanId) {
    return { ok: false, error: 'Informe seu e-mail ou telefone.' };
  }
  if (!password || password.length < 4) {
    return { ok: false, error: 'Informe uma senha válida.' };
  }

  const normalizedRole = role === 'barbearia' ? 'barbearia' : 'cliente';
  const name =
    normalizedRole === 'barbearia'
      ? 'The Barber'
      : cleanId.includes('@')
        ? cleanId.split('@')[0].replace('.', ' ')
        : 'Lucas Martins';

  const user = { name, role: normalizedRole };

  if (rememberMe) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch {
      // ignora erro de storage
    }
  }

  return { ok: true, user };
}

export function registerUser({ role, name, email, phone, password, acceptedTerms }) {
  const cleanName = name.trim();
  if (!cleanName) {
    return {
      ok: false,
      error: role === 'barbearia' ? 'Informe o nome da barbearia.' : 'Informe seu nome completo.',
    };
  }
  if (!email.includes('@')) {
    return { ok: false, error: 'Informe um e-mail válido.' };
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return { ok: false, error: 'Informe um telefone com DDD.' };
  }
  if (!password || password.length < 6) {
    return { ok: false, error: 'A senha deve ter pelo menos 6 caracteres.' };
  }
  if (!acceptedTerms) {
    return { ok: false, error: 'Aceite os termos de uso para continuar.' };
  }

  const user = {
    name: cleanName,
    role: role === 'barbearia' ? 'barbearia' : 'cliente',
  };

  return { ok: true, user };
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignora
  }
}
