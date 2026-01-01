import { configDotenv } from "dotenv";

configDotenv({quiet:true})

export const ENV={
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    JWT_TOKEN : process.env.JWT_TOKEN,
    ADMIN_EMAIL : process.env.ADMIN_EMAIL,
    CLOUD_NAME : process.env.CLOUD_NAME,
    API_SECRET : process.env.API_SECRET,
    API_KEY : process.env.API_KEY
}