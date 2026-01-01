//here two middleware 1st is for user logged in or not
//2nd is logged in user owner or not 
import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js"
import { User } from "../model/user.model.js"

export const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message:"Token not found"
            })
        }

        const decode = await jwt.verify(token, ENV.JWT_TOKEN) 

        if(!decode){
            return res.status(401).json({
                message:"User not logged in"
            })
        }

        req.id = decode.userId

        next()

    } catch (error) {
        console.log(`error from protect middlerware, ${error}`)
    }
}

export const adminRoute =  async(req,res,next)=>{
    const userId = req.id;
    if(!userId){
        return res.status(401).json({
            message:"Please Login as an Admin"
        })
    }

    const user = await User.findById(userId)

    if(!user){
        return res.status(401).json({
            message:"Please Login as an Admin"
        })
    }

    if(user.email===ENV.ADMIN_EMAIL){
        next()
    }else{
        return res.status(401).json({
            message:"Access denied, Admin Only"
        })
    }

}