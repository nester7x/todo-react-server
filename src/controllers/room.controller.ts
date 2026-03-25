import type { Request, Response } from 'express';
import Room from '../models/room.model';

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, isDirectMessage } = req.body;
    const creatorId = req.user!.id;

    const room = await Room.create({
      name,
      isDirectMessage,
      owner: creatorId,
      members: [creatorId]
    });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

export const getUserRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const rooms = await Room.find({ members: userId });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    );
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to join room' });
  }
};
