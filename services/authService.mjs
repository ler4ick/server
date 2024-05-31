import jwt from 'jsonwebtoken';

class AuthService {
  login(userId) {
    // Генерация JWT-токена
    const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });

    // Сохранение информации о пользователе
    localStorage.setItem('user', JSON.stringify({ userId, token }));

    return token;
  }

  // Другие методы авторизации, например, logout(), isLoggedIn(), etc.
}

export default AuthService;