import jwt from 'jsonwebtoken'

export const generateToken=(userId,res)=>{
   if(!process.env.JWT_SECRET){
      throw new Error("jwt_secret is missing")
   }
 const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'7d'
 })
 res.cookie("jwt",token,{maxAge:7*24*60*60*1000,
    httpOnly:true,//prevent XSS attacks cross_site scripting atttacks
    sameSite:"strict",//CSRF ATTACKS
    secure:process.env.NODE_ENV!=="development"
})
return token
}