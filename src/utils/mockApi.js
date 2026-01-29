// Simple mock API for Sprint 16 instructor review
// Simulates login, register, and token validation

const DEMO_USER = {
  id: 'user_demo',
  email: 'demo@test.com',
  name: 'Demo User'
};
const DEMO_PASSWORD = 'password123';
const MOCK_TOKEN = 'mock_jwt_token_123';

function simulateDelay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function mockLogin({ email, password }) {
  await simulateDelay(900);
  if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
    localStorage.setItem('mock_token', MOCK_TOKEN);
    localStorage.setItem('mock_user', JSON.stringify(DEMO_USER));
    return {
      success: true,
      user: DEMO_USER,
      token: MOCK_TOKEN,
      message: 'Login successful'
    };
  }
  return {
    success: false,
    error: 'Invalid credentials'
  };
}

export async function mockRegister({ email, password, name }) {
  await simulateDelay(1200);
  if (!email || !password || !name) {
    return { success: false, error: 'All fields required' };
  }
  if (email === DEMO_USER.email) {
    return { success: false, error: 'Email already registered' };
  }
  // Simulate registration
  const newUser = { id: 'user_new', email, name };
  localStorage.setItem('mock_token', MOCK_TOKEN);
  localStorage.setItem('mock_user', JSON.stringify(newUser));
  return {
    success: true,
    user: newUser,
    token: MOCK_TOKEN,
    message: 'Registration successful'
  };
}

export async function mockValidateToken(token) {
  await simulateDelay(500);
  if (token === MOCK_TOKEN) {
    const user = JSON.parse(localStorage.getItem('mock_user')) || DEMO_USER;
    return { success: true, user };
  }
  return { success: false, error: 'Invalid or expired token' };
}
