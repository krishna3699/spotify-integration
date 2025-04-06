import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    config.JWT_SECRET,
    { expiresIn: '1h' }
  );

};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.JWT_SECRET);
};