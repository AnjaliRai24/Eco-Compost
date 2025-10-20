import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; isAdmin: boolean };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const payload = jwt.verify(token, secret) as { id: string; email: string; isAdmin?: boolean };
    req.user = { id: payload.id, email: payload.email, isAdmin: !!payload.isAdmin };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  next();
}




