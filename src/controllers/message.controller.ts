import type { Request, Response } from 'express';
import Message from '../models/message.model';

export const getRoomMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('senderId', 'username image');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
