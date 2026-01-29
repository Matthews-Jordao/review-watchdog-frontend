// Simulated authentication API for testing login/register without a real backend.

// Demo user credentials (email: demo@test.com, password: password123)
const DEMO_USER = {
  _id: 'fake-id',
  name: 'Fake User',
  email: 'demo@test.com'
};
const DEMO_PASSWORD = 'password123';
const FAKE_TOKEN = 'a_fake_token';

// Simulate login: resolves with a token if credentials match demo user
export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_USER.email && password === DEMO_PASSWORD) {
        resolve({ token: FAKE_TOKEN });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 900);
  });
};

// Simulate token check: resolves with user data if token is valid
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === FAKE_TOKEN) {
        resolve({ data: DEMO_USER });
      } else {
        reject(new Error('Invalid or expired token'));
      }
    }, 500);
  });
};

// Simulate registration: checks for required fields and duplicate email
export const register = (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name || !email || !password) {
        reject(new Error('All fields required'));
      } else if (email === DEMO_USER.email) {
        reject(new Error('Email already registered'));
      } else {
        resolve({ token: FAKE_TOKEN, data: { _id: 'new-id', name, email } });
      }
    }, 1200);
  });
};
