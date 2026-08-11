import type { Request, Response } from 'express';
import mongoose from 'mongoose';
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

export const createDmRoom = async (req: Request, res: Response) => {
  try {
    const { targetUserId, isDirectMessage } = req.body;
    const creatorId = req.user!.id;

    const existing = await Room.findOne({
      isDirectMessage: true,
      members: { $all: [creatorId, targetUserId], $size: 2 }
    });
    if (existing) {
      res.status(400).json({ error: 'Room already exist' });
      return;
    }

    const newRoom = await Room.create({
      isDirectMessage,
      owner: creatorId,
      members: [creatorId, targetUserId]
    });
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

export const getUserRooms = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const rooms = await Room.find({ members: userId }).populate(
      'members',
      'username'
    );
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    if (room.members.includes(new mongoose.Types.ObjectId(userId))) {
      res.status(400).json({ error: 'User is already a member' });
      return;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to join room' });
  }
};

export const searchRooms = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    if (!search) {
      res.status(400).json({ error: 'Query params is required' });
      return;
    }

    const regex = new RegExp(search as string, 'i');
    const rooms = await Room.find({
      $or: [{ name: regex }]
    });

    res.status(200).json(rooms);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};
