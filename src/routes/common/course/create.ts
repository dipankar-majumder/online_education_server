import {Router} from 'express';
import {verifyAccessToken} from '../../../auth/verify';

const router: Router = Router();

router.post('/createCourse', verifyAccessToken);

export const create: Router = router;
