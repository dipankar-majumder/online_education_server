import {sign} from 'jsonwebtoken';

// generate access token
export const getAccessToken = (userName: string, type: string) => {
  return sign({userName, type}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

// generate refresh token
export const getRefreshToken = (userName: string) => {
  return sign({userName}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
