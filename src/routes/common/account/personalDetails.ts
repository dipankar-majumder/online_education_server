import {Router} from 'express';
import {verifyAccessToken} from '../../../auth/verify';

const router: Router = Router();

router.post('/setPersonalDetails', verifyAccessToken);
router.get('/getPersonalDetails', verifyAccessToken);

export const personalDetails: Router = router;
