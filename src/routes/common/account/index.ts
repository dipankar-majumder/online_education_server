import {Router} from 'express';

import {address} from './Address';
import {education} from './education';
import {personalDetails} from './personalDetails';

const routes: Router = Router();

routes.use('/account', address);
routes.use('/account', education);
routes.use('/account', personalDetails);

export const account: Router = routes;
