import dotenv from 'dotenv';

dotenv.config();


if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}


export const config = {
  PORT: process.env.PORT || 3001,
  MONGO_URI: process.env.MONGO_URI as string,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET! as string,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET! as string,
	RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET! as string,
	EMAIL_USER: process.env.EMAIL_USER as string,
	EMAIL_PASS: process.env.EMAIL_PASS as string
};
