import { Socket } from 'socket.io';

export const joinRoomEvent = (roomId: string, socket: Socket) =>
  socket.join(roomId);
