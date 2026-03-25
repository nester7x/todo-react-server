import type { Request, Response } from 'express';
import fs from 'fs';
import User from '../models/user.model';

export const getMe = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;
    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (id !== user.id) {
      res.status(403).json({ error: 'Unauthorized to update this user' });
      return;
    }

    await User.findByIdAndUpdate(id, req.body);
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const uploadUserImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const readimagem = fs.readFileSync(`uploads/${file.originalname}`);
    const imagemBase64 = Buffer.from(readimagem).toString('base64');

    await User.findByIdAndUpdate(req.user!.id, { image: imagemBase64 });

    res.json({ message: 'Image uploaded successfully' });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};
