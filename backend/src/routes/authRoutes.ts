import { Router } from 'express';
import * as authController from '../handlers/authHandler';

const router = Router();

router.get('/login', authController.login);
router.get('/spotify/callback', authController.callback);

export default router;
