import {Router} from 'express';
import {verifyAccessToken} from '../../../auth/verify';

const router: Router = Router();

router.post('/updateCourse', verifyAccessToken);

export const update: Router = router;
