require("dotenv").config()
const DB = process.env.DB
const mongoose = require("mongoose");
const { number } = require("zod");

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,  
    connectTimeoutMS: 10000,         
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minLength:3,
        maxLength:50   
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,

    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,

    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    balance:{
        type:Number,
        require:true
    }
})

const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,
    Account
}