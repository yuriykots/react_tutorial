const express = require("express")

express()
  .get("/", (req,res,next) =>{
    res.send("ok")
  })
  .listen(3000)
