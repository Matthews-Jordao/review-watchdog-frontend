// src/utils/auth.js
// Simulated authentication API for Stage 1

const DEMO_USER = {
  _id: 'fake-id',
  name: 'Fake User',
  email: 'demo@test.com'
};
const DEMO_PASSWORD = 'password123';
const FAKE_TOKEN = 'a_fake_token';

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
