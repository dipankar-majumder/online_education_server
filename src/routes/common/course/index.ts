import {Router} from 'express';

import {create} from './create';
import {ratingReview} from './RatingReview';
import {update} from './update';

const routes: Router = Router();

routes.use('/course', create);
routes.use('/course', ratingReview);
routes.use('/course', update);

export const course: Router = routes;
