import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/mongodb';
import authRoute from './routes/auth.routes';
import userRoute from './routes/user.routes';
import messageRoute from './routes/message.route';
import roomRoute from './routes/room.routes';
import { app, server } from './helpers/socket-io';

dotenv.config();

const cors = require('cors');
const corsOptions = { origin: ['http://localhost:9000'] };

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

connectDb();

// routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);
app.use('/api/rooms', roomRoute);

server.listen(process.env.PORT, () =>
  console.log('Server started on port', process.env.PORT)
);
