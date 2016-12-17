const express = require("express")
const bodyParser = require("body-parser")
const sessions = require("express-sessions")
const passport = require("passport")
const db = require("./db")
require("/15-authentification-passport")

express()
  .set("view engine", "hjs")
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(session({secret: "I love dogs", resave: false, saveUninitialized: false}))
  .use(passport.initialize())
  .use(passport.session())
  .get("/", (req, res, next) => {
    res.send({

    })
  })
  .get("/login", (req, res, next)=>{
    res.render("login")
  })
  .post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
  }))
  .get("/logout", (req, res, next) =>{
    req.session.destroy((err) =>{
      res.redirect("/login")
    })
  })
  .get("/signup", (req, res, next)=>{
    res.render("signup")
  })
  .post("/signup", passport.authenticate("local-register",{
    successRedirect: "/",
    failureRedirect: "/signup",
  }))


  .listen(3000)
