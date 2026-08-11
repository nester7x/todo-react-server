import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenHandler';
import {
  createDmRoom,
  createRoom,
  getUserRooms,
  joinRoom,
  searchRooms
} from '../controllers/room.controller';

const router = Router();

router.post('/', validateToken, createRoom);
router.post('/dm', validateToken, createDmRoom);
// router.get('/', validateToken, searchRooms);
router.get('/', validateToken, getUserRooms);
router.post('/:id/join', validateToken, joinRoom);

export default router;
