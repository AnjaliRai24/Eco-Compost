import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { Pickup } from '../models/Pickup';

export const router = Router();

const createPickupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(10),
  city: z.string().min(2),
  pincode: z.string().min(4),
  preferredDate: z.string(),
  preferredTime: z.string(),
  wasteType: z.string(),
  estimatedWeight: z.number().optional(),
  notes: z.string().optional(),
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const parsed = createPickupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error?.issues?.[0]?.message || 'Invalid input' });
  const data = parsed.data;
  const pickup = await Pickup.create({
    userId: req.user!.id,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    pincode: data.pincode,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    wasteType: data.wasteType,
    estimatedWeight: data.estimatedWeight,
    notes: data.notes,
    status: 'pending',
  });
  return res.json({ pickup });
});

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const list = await Pickup.find({ userId: req.user!.id }).sort({ createdAt: -1 });
  return res.json({ pickups: list });
});


