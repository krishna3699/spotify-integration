import { Router } from 'express';
import * as trackAdviceController from '../handlers/trackAdviceHandler';
import { authenticate, authorizeUser } from '../middlewares/authMiddleware';

const router = Router();

router.get(
    '/:user_id/top-tracks',
    authenticate,
    authorizeUser,
    trackAdviceController.getTopTracks
);

router.post(
    '/:user_id/advice',
    authenticate,
    authorizeUser,
    trackAdviceController.getTrackAdvice
);

// TODO: should implement this
// router.get(
//   '/user/:user_id/track-advice',
//   authenticate,
//   authorizeUser,
//   trackAdviceController.getTrackAdvice
// );

export default router;
