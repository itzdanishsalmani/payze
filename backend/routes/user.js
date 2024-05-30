require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const { User, Account } = require("../db");  
const jwt = require("jsonwebtoken")
const express = require('express');
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupSchema = zod.object({

    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
}) 

const signinSchema = zod.object({

    username:zod.string(),
    password:zod.string()
}) 

const updateSchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()

})
 
router.post("/signup", async (req,res)=>{

    const { success } = signupSchema.safeParse(req.body)

    if(!success) {
        return res.status(411).json({
            message:"Email already taken or Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })
     
    if (existingUser) {
        return res.status(411).json({
            message: "User already exists"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    const userId = user._id
//account created
    await Account.create({
        userId,
        balance: (1 + Math.random()) * 10000 
    }) 

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message:"User created successfully",
        token:token 
    })

})

router.post("/signin", async (req,res)=>{

    const { success } = signinSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)
        
        res.send({
            token: token 
    })
    return
    }
    res.status(411).json({
        message:"Error while logging in"
    })
})

router.put("/edit",authMiddleware, async (req,res)=>{
    const { success } = updateSchema.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    try {
    await User.updateOne( {_id:req.userId},req.body)
    res.status(200).json({
        message:"Update successfully"
    })
    }catch(error){
        res.status(411).json({
            error:error
        })
    }
})

router.get("/bulk" ,async (req,res)=>{
    const filter = req.query.filter || "";
     
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user => ({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id   
        }))
    })
})

module.exports = router;
