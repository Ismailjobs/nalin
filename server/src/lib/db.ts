import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nalin';

export async function connectDb(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
}
