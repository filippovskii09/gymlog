import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import { CORS_WHITE_LIST } from './constants/constants.js';
import routes from './routes/index.js';
import { setupSwagger } from './swagger/swagger.js';
const app = express();

app.use(
  cors({
    origin: CORS_WHITE_LIST,
    credentials: true,
  })
);

app.use(express.json());

app.use(helmet());

setupSwagger(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});

app.use('/api', limiter, routes);

app.get('/', (_, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${config.PORT}`);
});

connectDB();
