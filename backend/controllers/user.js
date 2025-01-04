
import { cookie } from "express-validator";
import {TryCatch} from "../middlewares/error.js"
import { User3 } from "../models/user.js";
import { emitEvent, sendToken } from "../utils/feature.js";
import {compare} from "bcrypt"
import { ErrorHandler } from "../utils/utility.js";
import { Request3 } from "../models/request.js";
// import { Promise } from "mongoose";



const newUser =TryCatch(async(req,res,next)=>{
    const {name,username,password,intrests}=req.body;
    console.log(req.body);
//     const file=req.file;
//    if(!file) return  next(new ErrorHandler("Please Upload Avatar"));

    const avatar={
        public_id:"sdfsd",
        url:"asdfdcx",   
    };
    // this user give me the _id, which is in the mongodb database
    // here we are creating the User of following data
 const user =await User3.create({
    name,
    username,
    password,
    intrests,

 })
  // here user me id save hoga jis user ko create kr rhe hai

   sendToken(res,user,201,"User created")
})
const login= TryCatch(async(req,res,next)=>{
    const {username,password}=req.body;
   
    const user = await User3.findOne({username}).select("+password");
    console.log(user)

    if(!user) {
        return next(new ErrorHandler("user doesn't exits",404));
    }

    sendToken(res,user,201,`welcome back, ${user.name}`);

})

const searchUser = TryCatch(async(req,res,next)=>{
    

})
const logout=TryCatch(async(req,res)=>{
    return res.status(200).cookie("chat-token","",{...cookieOptions,maxAge:0})
    .json({
      success:true,
      message:"Logged out Successfully",
    })
})
const search = TryCatch(async(req,res,next) =>{
    // when search dialog open , and when we write anything that goes into the querysection either 
    // search by username ,name
    const {query} =req.query;
    if(!query){
        return next(new ErrorHandler("Search the user",404));
    }
    const regex= new RegExp(query,'i');
    const users = await User3.find({
        $or: [
          { name: regex }, 
          { username: regex }, 
        //   here we are searching in name and username section of tha database
        ],
      }).select('name username');
      // .select give me the name and username of the user together
     if(!users){
        return next(new ErrorHandler("Error in Searching users",500));
     }
     res.status(200).json({
        success:true,
        users
     })

})
const sendRequest = TryCatch(async(req,res,next)=>{
    //when i am sending the request // i know the userId where we are sending the request
    const {userId}=req.body;

    // here we find the request in the Request database , that request
    // is send before or ot
    const request =await Request3.findOne({
        $or:[
           { sender:req.user,receiver:userId},
           {sender:userId,receiver:req.user}
        ]
    })
    if(request){
        return next(new ErrorHandler("Request already sent",400));
    }
    await Request3.create({
        sender:req.user,
        receiver:userId
    })

    // by emiting the event we send the notification, to userId, where we are sending the request
    emitEvent(req,"NEW_REQUEST",[userId])

    res.status(200).json({
        success:true,
        message:"Friend Rquest has been sent"
    })

})

// when we click on the notification icon, then a dialog open , to accept and reject the request
const acceptFriendRequest = TryCatch(async(req,res,next)=>{
    const {requestId,accept}=req.body;

  // here we are find the request by requesbyid
    const request =Request3.findById(requestId)
    .populate("sender","name")
    .populate("receiver","name");
    // we have to check that i am authoriz to accept the request or not
    if(!request) return next(new ErrorHandler("request not find",404));
    if(request.receiver._id.toString()!==req.user.toString()) return next(new ErrorHandler("You are not authorized to accept the Friend Request",401));

    if(!accept){
        await request.deleteOne();
        // here we deleting the RequestId from the Database
      res.status(200).json({
        massage:"Friend Request Rejected"
      })

    }
    // when we accepting the request then they become friends then we have to update 
    // their friends array
    request.status="accepted"
    await request.save()

    const [sender,receiver]=await Promise.all([
        User3.findById(request.sender._id),
        User3.findById(request.receiver._id)
    ])
    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);
     await Promise.all([sender.save(),receiver.save()]);
     res.status(200).json({
        success:true,
        massage:"Friend Request accepted",
        senderId:request.sender._id
     })
}) 


export {newUser,login,logout,search,sendRequest , acceptFriendRequest}