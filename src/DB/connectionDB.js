import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("src/config/.env") });

const ConnectionDB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("MongoDB are runnig Suceesfully 🛢️✅");
    })
    .catch((err) => {
      throw new Error(err.message, { cause: err.cause });
    });
};
export default ConnectionDB;
