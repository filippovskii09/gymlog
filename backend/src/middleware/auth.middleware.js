import { config } from '../config/config.js';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Auth header:', req.header('Authorization'));
  if (!token) {
    return res.status(401).json({ error: 'Доступ заборонено!' });
  }

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Недійсний токен!' });
  }
};
