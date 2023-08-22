import jwt from "jsonwebtoken";

const secretKey = process.env.NEXT_JWT_PRIVATE_KEY;

export const resetJwtToken =  (id: string) => {
  if (secretKey !== undefined) {
    const token =  jwt.sign({ id }, secretKey, { expiresIn: 60 * 60 });
    return token;
  }
};

export const verifyJwtToken =  (token: string) => {
    if (secretKey !== undefined) {
      const id =  jwt.verify( token , secretKey);
      return id;
    }
  };
  
