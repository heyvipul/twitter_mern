
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const authentication = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send({msg:"wrong credentials,please login first!"})
    }
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.send({msg:"invalid token!"})
        }
        const userId = decoded.userId
        req.userID = userId
        next();
    })
}

module.exports = authentication;