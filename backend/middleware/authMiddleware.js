import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  try {
    let {token}=req.cookies;
    console.log(req.cookies)
   if(!token){
    return res.status(400).json({message:'token is not found'})
   }
   let verifyToken=jwt.verify(token,process.env.JWT_SEC);
   console.log("Verfify token",verifyToken)
   req.userId=verifyToken.userid;
   next()
  } catch (error) {
    return res.status(500).json({message:'Internal Server isAuth error'})
  }
  
};
