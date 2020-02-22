import {Router} from 'express';

// import {address} from './Address';
import { examination } from './examination';

const routes: Router = Router();

routes.use('/student', examination);

export const student: Router = routes;
