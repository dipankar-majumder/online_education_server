import {Router} from 'express';
import {check} from 'express-validator';
import {signInController} from '../controllers/sIgnInController';

const router: Router = Router();

router.post(
  '/signIn',
  [
    check('password')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      .withMessage('Invalid Password Formate'),
    check('userName')
      .not()
      .isEmpty()
      .withMessage("User Name cant' empty"),
  ],
  signInController
);

export const signIn: Router = router;
