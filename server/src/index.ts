
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { contentModel, Tag, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
//jwt.generate()
const app = express();
app.use(express.json())


app.post("/api/v1/signup", async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "User signed up"
        })
    }catch(error){
        console.log(error)
        res.status(411).json({message: "Internal server error"})
    }
});

app.post("/api/v1/signin", async (req, res)=>{
    const username = req.body.username;
    const password= req.body.password;
    try{
        const existingUser = await UserModel.findOne({
            username,
            password
        })
        if(existingUser){
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_PASSWORD)
            res.json({
                token
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(411).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async(req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    await contentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content added"
    }) 
})

app.get("/api/v1/content", userMiddleware, async (req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req,res)=>{
    
    try{  
        //@ts-ignore  
        const userId = req.userId;
        const contentId = req.body.contentId;
        console.log("Deleting from user", userId , "Content ID", contentId)
        await contentModel.deleteMany({
            userId:userId,
            _id:contentId
        })
        res.json({
            message: "Deleted"
        })
    }catch(error){
        console.log(error)
        res.status(403).json({
            message: "Invalid content ID"
        })
    }

})

app.post("/api/v1/brain/share", (req, res)=>{
    
})

app.get("/api/v1/brain/:shareLink", (req, res)=>{
    
})

app.listen(3000);