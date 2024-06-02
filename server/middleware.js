const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = ((req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId
       
        next()
    }catch(err){
        res.status(411).json({
            err:err
        })
    }

})
module.exports = {
    authMiddleware 
}