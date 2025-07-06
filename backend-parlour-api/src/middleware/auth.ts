import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
  io?: Server;
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Invalid token format. Use Bearer <token>' });
    return;
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in environment variables');
    res.status(500).json({ message: 'Server configuration error' });
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err.message);
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        res.status(403).json({ message: 'Invalid token' });
      } else {
        res.status(403).json({ message: 'Token verification failed' });
      }
      return;
    }
    req.user = user;
    next();
  });
}

export function authorizeRoles(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
}
