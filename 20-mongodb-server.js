const express = require("express")
const mongo = require("./db")

express()
  .get("/", (req,res,next) =>{
    res.send("ok")
  })
  .get("/create/:first_name/:last_name/:email/:password," (req, res, next) =>{
    mongo.db.collection("users")
     .insert(req.params, (err, result) => {
       res.send(result)
     })
  })
  .listen(3000)
