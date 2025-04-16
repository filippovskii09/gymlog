import mongoose from 'mongoose/index.js';
import { config } from './config.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ MongoDB Connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
