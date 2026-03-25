import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenHandler';
import {
  createRoom,
  getUserRooms,
  joinRoom
} from '../controllers/room.controller';

const router = Router();

router.post('/', validateToken, createRoom);
router.get('/', validateToken, getUserRooms);
router.post('/:id/join', validateToken, joinRoom);

export default router;
