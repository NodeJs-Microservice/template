import crypto from 'crypto';

const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const secureString = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};

const hashSha256 = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

const hashSha512 = (data: string) => {
  return crypto.createHash('sha512').update(data).digest('hex');
};

export { validateEmail, secureString, hashSha256, hashSha512 };
