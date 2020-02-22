import {Router} from 'express';
import {verifyAccessToken} from '../../../auth/verify';

const router: Router = Router();

router.post('/rating', verifyAccessToken);

router.post('/review', verifyAccessToken);

export const ratingReview: Router = router;
