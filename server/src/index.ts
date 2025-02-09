
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { contentModel, Link, Tag, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
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

app.post("/api/v1/brain/share", userMiddleware, async(req, res)=>{
    const share = req.body.share;
    const hash = random(10)
    if(share){
        await Link.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash: hash
        })
    }else {
        await Link.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Removed sharable link"
        })
    }

})

app.get("/api/v1/brain/:shareLink", async (req, res)=>{
    const hash = req.params.shareLink
    const link = await Link.findOne({
        hash: hash
    });
    if(!link){
        res.status(411).json({
            message: "Incorrect hash input"
        })
        return;
    }
    const content = await contentModel.find({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId.toString()
    })
    res.json({
        //@ts-ignore
        username: user?.username,
        content: content
    })
})

app.listen(3000, ()=>{
    console.log("Listening on:  http://localhost:3000/")
});