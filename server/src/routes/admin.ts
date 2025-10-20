import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { Pickup } from '../models/Pickup';
import { Order } from '../models/Order';

export const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/pickups', async (_req, res) => {
  const list = await Pickup.find({}).sort({ createdAt: -1 });
  res.json({ pickups: list });
});

router.get('/orders', async (_req, res) => {
  const list = await Order.find({}).sort({ createdAt: -1 });
  res.json({ orders: list });
});

router.patch('/pickups/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: 'status required' });
  const updated = await Pickup.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ pickup: updated });
});

router.patch('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: string };
  if (!status) return res.status(400).json({ error: 'status required' });
  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ order: updated });
});



















