import { configDotenv } from "dotenv";

configDotenv({quiet:true})

export const ENV={
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    JWT_TOKEN : process.env.JWT_TOKEN
}