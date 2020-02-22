import {Router} from 'express';
import {verifyAccessToken} from '../../auth/verify';

const router: Router = Router();

router.post('/examination', verifyAccessToken);

export const examination: Router = router;
