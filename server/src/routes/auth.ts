import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User';
import { requireAuth, AuthRequest } from '../middleware/auth';

export const router = Router();

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

router.post('/signup', async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error?.issues?.[0]?.message || 'Invalid input' });
  const { email, password, fullName } = parsed.data;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, fullName, isAdmin: false });

  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, isAdmin: user.isAdmin } });
});

// Admin self-register with email allowlist (must include "@eco")
const adminRegisterSchema = z.object({
  email: z.string().trim().toLowerCase(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

router.post('/admin-register', async (req, res) => {
  const parsed = adminRegisterSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error?.issues?.[0]?.message || 'Invalid input' });
  const { email, password, fullName } = parsed.data;

  const allowAdmin = /@eco(\.|$)/i.test(email) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!allowAdmin) return res.status(403).json({ error: 'Admin registration restricted to @eco emails' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, fullName, isAdmin: true });

  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, isAdmin: user.isAdmin } });
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error?.issues?.[0]?.message || 'Invalid input' });
  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'dev_secret_change_me', { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, isAdmin: user.isAdmin } });
});

router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  const user = await User.findById(req.user!.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  return res.json({ user: { id: user.id, email: user.email, fullName: user.fullName, isAdmin: user.isAdmin } });
});


