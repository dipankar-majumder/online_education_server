import {Router} from 'express';

import {signIn} from './SignIn';
import {signUp} from './SignUp';
import {admin} from './admin';
import {instructor} from './instructor';
import {student} from './student';
import {verifyAccessToken} from './../auth/verify';
import {verifyAdmin, verifyInstructor, verifyStudent} from '../auth/verify';
import { publicRoute } from './publicRoute';

const routes: Router = Router();

// general routes
routes.use(signIn);
routes.use(signUp);
routes.use(publicRoute);

// special routes
routes.use(verifyAccessToken, verifyAdmin, admin);
routes.use(verifyAccessToken, verifyInstructor, instructor);
routes.use(verifyAccessToken, verifyStudent, student);

export default routes;
