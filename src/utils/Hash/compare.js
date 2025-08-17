import crypto from "crypto-js";
export const compare = async ({ plainText, cipherText }) => {
  return bcrypt.compareSync(plainText, cipherText);
};
