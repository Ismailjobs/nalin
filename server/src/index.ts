import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDb } from './lib/db.js';
import { contactRouter } from './routes/contact.js';
import { verifyCaptchaRouter } from './routes/verify-captcha.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT) || 4001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3001';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://localhost:3001', 'http://127.0.0.1:3001'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests.' },
});
app.use(limiter);

app.use('/api/verify-captcha', verifyCaptchaRouter);
app.use('/api/contact', contactRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  await connectDb();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nalin API listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
