import express from "express";
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', userRoute)

app.listen(ENV.PORT,()=>{
    connectDB()
    console.log(`Server Started ${ENV.PORT}`)
})