import jwt from "jsonwebtoken";

const secretKey = process.env.NEXT_JWT_PRIVATE_KEY
  ? process.env.NEXT_JWT_PRIVATE_KEY
  : "";

export const generateJwtToken = (id: string): string => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: 60 * 60 * 30,
  });
};

export const verifyJwtToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, secretKey);
};

export const resetJwtToken = (id: string): string => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: 60 * 5,
  });
};
