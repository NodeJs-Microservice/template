import jwt from 'jsonwebtoken';
import config from 'config';

interface IJwtPayload {
  _id: string;
  fullName: string;
  session: string;
}

const signToken = (payload: IJwtPayload) => {
  const options: any = {
    algorithm: 'HS512',
    expiresIn: '15m'
  };
  return jwt.sign(payload, config.get('token_secret'), options);
};

const validateToken = (token: string): IJwtPayload => {
  return jwt.verify(token, config.get('token_secret')) as IJwtPayload;
};

export { signToken, validateToken };
