import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {hash} from 'bcryptjs';
import 'reflect-metadata';
import {getConnection} from 'typeorm';
import {Login} from '../entity/Users/Login';
import {User} from '../entity/Users/User';

// controller for check user name is available or not
export const userNameCheckController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // userName from request query
  const userName = req.query.userName;
  try {
    // connection
    const connection = getConnection();

    // get the user
    const user = await connection
      .getRepository(Login)
      .createQueryBuilder('user')
      .where('user.userName = :userName', {userName})
      .getOne();

    if (user === undefined)
      res.json({status: false, msg: 'User Name not available'});
    else res.json({status: false, msg: 'User Name not available'});
  } catch (err) {
    // pass the error to error handler
    next(err);
  }
};

// controller for sign up a user
export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // userName and type from body of request
  const {userName, name, password, confirmPassword, email} = req.body;

  // error from express validator
  const errors = validationResult(req);

  try {
    // check for password error
    if (!errors.isEmpty()) {
      throw {src: 'expected', err: errors.array()};
    }

    // match password and confirm password
    if (password !== confirmPassword)
      throw {
        src: 'expected',
        err: [
          {
            param: 'confirmPassword',
            msg: "Password and confirm password doesn't match",
          },
        ],
      };

    // connection to db
    const connection = getConnection();

    // user from db
    const user: any = await connection
      .getRepository(Login)
      .createQueryBuilder('user')
      .where('user.userName = :userName', {userName})
      .getOne();

    // check user with the user name is exist or not
    if (user !== undefined)
      throw {
        src: 'expected',
        err: [
          {
            param: 'userName',
            msg: 'User Name not available',
          },
        ],
      };

    // generate password hash
    const hashPass = await hash(password, 10);

    // create user
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;

    // save user
    connection.manager.save(newUser);

    // TODO: type will be determine as instructor or student or parent

    // crate login credential for user
    const newLogin = new Login();
    newLogin.password = hashPass;
    newLogin.userName = userName;
    newLogin.type = 'student';
    newLogin.user = newUser;

    // save login credential
    connection.manager.save(newLogin);

    // send response 
    res.status(200).json({success: true, msg: "Verify the email to active your account!"});
  } catch (err) {
    // pass to error handler
    next(err);
  }
};

// controller for email verification
export const emailVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
// TODO: add the email verification and active the account