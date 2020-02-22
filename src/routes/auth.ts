import {Router, Request, Response} from 'express';
import {verifyRefreshToken} from '../auth/verify';
import {getAccessToken} from '../auth/generate';

const router: Router = Router();

// generate an access token by the refresh token
router.post(
  '/accessTokenGen',
  verifyRefreshToken,
  (req: Request, res: Response) => {
    // generate the access token
    const accessToken = getAccessToken(req.body.userName, req.body.type);

    // send access token to the client
    res.json({accessToken});
  }
);

export const auth: Router = router;
