import type { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ error: 'Username, email, and password are required' });
      return;
    }

    const availableUser = await User.findOne({ email });
    if (availableUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    if (user) {
      const token = jwt.sign(
        {
          user: { username: user.username, email: user.email, id: user.id }
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '180m' }
      );

      res.status(201).json({ _id: user.id, email: user.email, token });
    }
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: { username: user.username, email: user.email, id: user.id }
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '180m' }
      );

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};
