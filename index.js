
const express = require("express")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./models/user");
const authentication = require("./middleware/auth");
const tweetRouter = require("./routes/tweet");
require("dotenv").config();

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL
const SECRET_KEY = process.env.SECRET_KEY
const app = express();

async function main(){
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("connection to mongodb successfull!");
    } catch (error) {
        console.log({error:"connection to mongodb failed!"});
    }
}
main();
app.use(express.json());

//base endpoint 
app.get("/",(req,res)=>{
    res.send("Base API endpoint is running!")
})

app.post("/register", async(req,res)=>{   
    try {
        const {name,email,password,gender,country} = req.body
        const user_exist = await User.findOne({email})
        if(user_exist){
            return res.send({msg:"user already exist please login!"})
        }
        bcrypt.hash(password,4,async(err,hash)=>{
            await User.create({name,email,password:hash,gender,country})
            res.send({msg:"registration successfully!"})
      })
    } catch (error) {
        res.send({error:"registration failed! server down!"}) 
    }

})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.send({msg:"user not exist pls register first!"})
    }
    const hash_password = user?.password
    bcrypt.compare(password,hash_password,async(err,result)=>{
        if(result){
            const token = jwt.sign({userId:user._id},SECRET_KEY);
            res.send({msg:"login successfull!",token:token})
        }
        else{
           return res.send({msg:"wrong credentials, login failed!"}) 
        }
    })

})

// app.use(authentication)
app.use("/tweet",tweetRouter)


app.listen(3000,()=>{
    console.log(`server is running on port ${PORT}`);
})