import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { joinRoomEvent } from '../events/room.events';
import { sendMessageEvent } from '../events/message.events';

export const app = express();
export const server = createServer(app);

export const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId: string) => joinRoomEvent(roomId, socket));

  socket.on(
    'send-message',
    (data: { roomId: string; senderId: string; body: string }) =>
      sendMessageEvent(data, io)
  );

  socket.on('disconnect', () => console.log('user disconnected:', socket.id));
});
