import Message from '../models/message.model';
import { Server } from 'socket.io';

export const sendMessageEvent = async (
  data: {
    roomId: string;
    senderId: string;
    body: string;
  },
  io: Server
) => {
  try {
    const message = await (
      await Message.create(data)
    ).populate('senderId', 'username image');
    io.to(data.roomId).emit('receive-message', message);
  } catch (err) {
    console.error('Failed to save message:', err);
  }
};
