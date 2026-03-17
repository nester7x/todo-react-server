import { Router } from 'express';
import {
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateUser,
  uploadUserImage
} from '../controllers/user.controller';
import { validateToken } from '../middlewares/validateTokenHandler';
import { uploadImageMiddleware } from '../middlewares/uploadImage';

const router = Router();

router.get('/', validateToken, getUsers);
router.get('/me', validateToken, getMe);
router.patch('/me', validateToken, updateUser);
router.get('/:id', validateToken, getUser);
router.delete('/:id', validateToken, deleteUser);
router.post('/upload', validateToken, uploadImageMiddleware, uploadUserImage);

export default router;
