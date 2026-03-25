import { Router } from 'express';
import { validateToken } from '../middlewares/validateTokenHandler';
import { getRoomMessages } from '../controllers/message.controller';

const router = Router();

router.get('/:roomId', validateToken, getRoomMessages);

export default router;
