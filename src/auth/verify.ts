import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {getConnection} from 'typeorm';
import {Login} from './../entity/Users/Login';

// verify access token
export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check authorization header is available or not
  if (req.headers.authorization !== undefined) {
    // get the access token
    const token = req.headers.authorization.split(' ')[1];
    try {
      // verify and decrypt the token
      const tokenVerify: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      // set the userName from the token and type
      req.body.userName = tokenVerify.userName;
      req.body.type = tokenVerify.type;

      // call the next function
      next();
    } catch (err) {
      // send invalid and lock response
      res.sendStatus(423);
    }
  } else {
    // send authorization error
    res.sendStatus(401);
  }
};

// verify refresh token
export const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check authorization header is available or not
  if (req.headers.authorization !== undefined) {
    // get the access token
    const token = req.headers.authorization.split(' ')[1];
    try {
      // verify and decrypt the token
      const tokenVerify: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      // get the user from db
      const user: any = await getConnection()
        .manager.getRepository(Login)
        .createQueryBuilder('user')
        .where('user.userName = :userName', {
          userName: tokenVerify.userName,
        });

      // match the refresh token
      if (
        user === undefined ||
        (user !== undefined && user.refreshToken !== token)
      )
        throw new Error('Unauthorized');

      // set userName and type
      req.body.userName = user.userName;
      req.body.type = user.type;

      // redirect to next function
      next();
    } catch (err) {
      // send un authorization error
      res.sendStatus(401);
    }
  } else {
    // send un authorization error
    res.sendStatus(401);
  }
};

// verify refresh token for new login
export const validateRefreshToken = (token: string): boolean => {
  try {
    // verify and decrypt the token
    const tokenVerify: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // return valid
    return true;
  } catch (err) {
    // return invalid
    return false;
  }
};


// verify admin
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 // check the type is admin or not
  if (req.body.type === "admin")
    next();
  else
    res.sendStatus(451);
};

// verify admin
export const verifyInstructor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check the type is admin or not
  if (req.body.type === "instructor")
    next();
  else
    res.sendStatus(451);
};

// verify admin
export const verifyStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check the type is admin or not
  if (req.body.type === "student")
    next();
  else
    res.sendStatus(451);
};