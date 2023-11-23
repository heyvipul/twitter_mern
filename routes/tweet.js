
const express = require("express");
const Tweet = require("../models/tweet");
const tweetRouter = express.Router();

//read
tweetRouter.get("/read",async(req,res)=>{
    try {
        const { category } = req.query;
        const query = category?{ category } : {};

        const tweets = await Tweet.find({query});
        res.send({tweets:tweets,msg:"here are all tweets!"})
    } catch (error) {
        res.send({msg:"something went wrong pls try again!"})
    }
    // res.send("tweet successfull!")
})

//create
tweetRouter.post("/create",async(req,res)=>{
    try {
        const {title,category,body} = req.body;
        const userId = req.user.id;

        const tweet = new Tweet.create({title,category,body});
        res.send({msg:"tweet created successfully!"})

    } catch (error) {
        res.send({msg:"something went wrong!"})
    }
})

//delete
tweetRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const tweetId = req.params.tweetId;
        const tweet = await Tweet.findOneAndDelete({_id:tweetId, userId:req.user.id})
        if(tweet){
            res.send({msg:"tweet deleted successfully!"})
        }
        else{
            res.send({msg:"tweet not found!"})
        }
    } catch (error) {
       res.send({msg:"something went wrong pls try again!"}) 
    }
})

//update
tweetRouter.patch("/edit/:tweetID", async (req, res) => {
    const tweetID = req.params.tweetID;
    const userID = req.userID;
    const payload = req.body;
    try {
        const update = await Tweet.findOneAndUpdate(
          { _id: tweetID, user_id: userID },
          payload
        );
        if (update) {
          res.json({msg : "Tweet updated successfully" });
        } else {
          res.json({msg : "update failed" });
        }
      } catch (error) {
        res.json({ msg :"something went wrong pls try again!" });
      } 
  });

module.exports = tweetRouter