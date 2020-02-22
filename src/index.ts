import 'reflect-metadata';
import {createConnection} from 'typeorm';
import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

// initialize .env configuration
dotenv.config();

// create connection with database
createConnection()
  .then(async connection => {
    // environment variable
    const port = Number(process.env.SERVER_PORT);

    // create express app
    const app = express();

    // express middleware
    app.use(cors());
    app.use(bodyParser.json());

    // roues
    app.use(routes);

    // define a route handler for the default home page
    app.get('/', (req, res) => {
      res.statusCode = 403;
      res.json({msg: 'Forbidden'});
    });

    // error handler
    app.use((err: any, req: Request, res: Response) => {
      // set status code
      res.statusCode = 400;

      // error response
      let errorResponse = [];

      // check error type is validator type or db or something else
      if (err.src === 'expected') {
        // handle validator errors
        err.err.forEach((e: {param: string; msg: string}) => {
          errorResponse = [...errorResponse, {param: e.param, msg: e.msg}];
        });
      } else {
        // unhandled error
        errorResponse = [
          ...errorResponse,
          {param: 'server', msg: 'Internal server Error!'},
        ];
      }

      // send response
      res.json(errorResponse);
    });

    // start the Express server
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
