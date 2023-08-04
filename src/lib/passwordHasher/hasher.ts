const bcrypt = require( "bcrypt");

const salt = 10;

export const passwordHasher = (password:string):string => {
  return bcrypt.hash(password, salt);
};

export const passwordCompare = (enteredPassword:string, hashedPassword:string):string => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};
