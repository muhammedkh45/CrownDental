import bcrypt from "bcryptjs";
import crypto from "crypto"
export const hash = async ({ plainText, saltRounds }) => {
  return bcrypt.hashSync(plainText, +saltRounds);
};

export const fixedHash = async (plainText) => {
  return crypto.createHash("sha256").update(plainText).digest("hex");
};