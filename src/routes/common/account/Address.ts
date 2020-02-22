import {Router} from 'express';
import {verifyAccessToken} from '../../../auth/verify';

const router: Router = Router();

router.post('/setAddress', verifyAccessToken);

router.get('/getAddress', verifyAccessToken);

export const address: Router = router;
