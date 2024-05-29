const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors")
const app =express()
app.use(express.urlencoded())
app.use(express.json())

app.use(cors())

app.use("/api/v1", mainRouter);

app.listen(7000,()=>(
    console.log(`server is running at 7000`)
))
