import {Router} from 'express';
import {verifyAccessToken} from '../../../auth/verify';

const router: Router = Router();

router.post('/setEducationalQualification', verifyAccessToken);
router.get('/getEducationalQualification', verifyAccessToken);

export const education: Router = router;
