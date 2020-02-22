import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {compare} from 'bcryptjs';
import 'reflect-metadata';
import {getConnection} from 'typeorm';
import {Login} from '../entity/Users/Login';
import {getAccessToken, getRefreshToken} from '../auth/generate';

export const setAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // userName and type from body of request
  const {userName, password} = req.body;

  // error from express validator
  const errors = validationResult(req);

  // response object
  const response = {
    accessToken: '',
    refreshToken: '',
    type: '',
    userName: '',
  };

  try {
    // check for password error
    if (!errors.isEmpty()) {
      throw {src: 'expected', err: errors.array()};
    }

    // connection to db
    const connection = getConnection();

    // user from db
    const user: any = await connection
      .getRepository(Login)
      .createQueryBuilder('user')
      .where('user.userName = :userName', {userName})
      .getOne();

    // check user with the user name is exist or not
    if (user === undefined)
      throw {
        src: 'expected',
        err: [
          {
            param: 'userName',
            msg: "User Name doesn't exist",
          },
        ],
      };

    // check password is match or not
    const passValid = await compare(password, user.password);
    if (!passValid) {
      throw {
        src: 'expected',
        err: [
          {
            param: 'password',
            msg: "Password doesn't match",
          },
        ],
      };
    }

    // set the userName and type in response
    response.userName = userName;
    response.type = user.type;

    // TODO: check for the refresh token in db and if verified then assign refresh token

    // create access token and refresh token
    response.accessToken = getAccessToken(userName, response.type);
    response.refreshToken = getRefreshToken(userName, response.type);

    // TODO: set the refresh token to the db

    // send response
    res.status(200).json(response);
  } catch (err) {
    // pass to error handler
    next(err);
  }
};

export const getAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // userName and type from body of request
  const {userName, password} = req.body;

  // error from express validator
  const errors = validationResult(req);

  // response object
  const response = {
    accessToken: '',
    refreshToken: '',
    type: '',
    userName: '',
  };

  try {
    // check for password error
    if (!errors.isEmpty()) {
      throw {src: 'expected', err: errors.array()};
    }

    // connection to db
    const connection = getConnection();

    // user from db
    const user: any = await connection
      .getRepository(Login)
      .createQueryBuilder('user')
      .where('user.userName = :userName', {userName})
      .getOne();

    // check user with the user name is exist or not
    if (user === undefined)
      throw {
        src: 'expected',
        err: [
          {
            param: 'userName',
            msg: "User Name doesn't exist",
          },
        ],
      };

    // check password is match or not
    const passValid = await compare(password, user.password);
    if (!passValid) {
      throw {
        src: 'expected',
        err: [
          {
            param: 'password',
            msg: "Password doesn't match",
          },
        ],
      };
    }

    // set the userName and type in response
    response.userName = userName;
    response.type = user.type;

    // TODO: check for the refresh token in db and if verified then assign refresh token

    // create access token and refresh token
    response.accessToken = getAccessToken(userName, response.type);
    response.refreshToken = getRefreshToken(userName, response.type);

    // TODO: set the refresh token to the db

    // send response
    res.status(200).json(response);
  } catch (err) {
    // pass to error handler
    next(err);
  }
};
