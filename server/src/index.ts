import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { router as authRouter } from './routes/auth';
import { router as pickupsRouter } from './routes/pickups';
import { router as ordersRouter } from './routes/orders';
import { router as adminRouter } from './routes/admin';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || '';

if (!mongoUri) {
  // eslint-disable-next-line no-console
  console.warn('MONGODB_URI not set. Set it in server/.env');
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'api', version: '1.0.0' });
});

app.use('/api/auth', authRouter);
app.use('/api/pickups', pickupsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);

// JSON error handler to avoid HTML error pages leaking to client
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = typeof err?.status === 'number' ? err.status : 500;
  const message = err?.message || 'Internal server error';
  // eslint-disable-next-line no-console
  console.error('API error:', err);
  res.status(status).json({ error: message });
});

async function start() {
  try {
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      // eslint-disable-next-line no-console
      console.log('Connected to MongoDB');
    }
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


