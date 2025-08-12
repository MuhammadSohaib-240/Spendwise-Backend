export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'dev_secret_key', // .env preferred
  expiresIn: '1h',
};
