import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/mongodb';
import authRoute from './routes/auth.routes';
import userRoute from './routes/user.routes';

dotenv.config();

const app = express();
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:9000']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

connectDb();

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(process.env.PORT, () =>
  console.log('Server started on port', process.env.PORT)
);
