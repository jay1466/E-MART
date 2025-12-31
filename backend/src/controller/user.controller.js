import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js";

export const register = async(req, res)=>{
    try {
        const {name, password, email} = req.body;
        if(!name || !password || !email){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(201).json({
                message:"User already Exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password:hashPassword

        })

        const token = await jwt.sign({userId:user._id}, ENV.JWT_TOKEN)

        return res.status(201).cookie("token", token, {maxAge:1*24*60*60*1000, http:true, sameSite:"none"}).json({
            message:`welcome ${user.name}`
        })

    } catch (error) {
        console.log(`error from register controller,${error}`)
    }
}


export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                message:"Please Provide all the Details"     
            })
        }

        const users = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"User does not exist"
            })
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"User does not exist"

            })
        }

        const token = await jwt.sign({userId:user._id}, ENV.JWT_TOKEN)

        return res.status(201).cookie("token", token, {maxAge:1*24*60*60*1000, http:true, sameSite:"none"}).json({
            message:`welcome ${user.name}`
        })

    } catch (error) {
        console.log(`error from login, ${error}`)
    }
}