import jwt from "jsonwebtoken"

const gentoken=async(userid)=>{
   return jwt.sign({userid},process.env.JWT_SEC,{
    expiresIn:"1d"
   })
}

export default gentoken;