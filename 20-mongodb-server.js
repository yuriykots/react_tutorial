const express = require("express")
const mongo = require("./db")

express()
  .get("/", (req,res,next) =>{
    res.send("ok")
  })
  .listen(3000)
