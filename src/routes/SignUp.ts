import {Router} from 'express';
import {check} from 'express-validator';
import {
  signUpController,
  userNameCheckController,
  emailVerifyController,
} from '../controllers/signUpController';

const router: Router = Router();

router.get('/checkUserName', userNameCheckController);

router.post(
  '/signUp',
  [
    check('email')
      .isEmail()
      .withMessage('Invalid Email Id'),
    check('name')
      .not()
      .isEmpty()
      .withMessage("Name can't empty"),
    check('password')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      .withMessage('Invalid Password'),
    check('userName')
      .not()
      .isEmpty()
      .withMessage("User Name cant' empty"),
  ],
  signUpController
);

router.post('/emailVerify', emailVerifyController);

export const signUp: Router = router;
