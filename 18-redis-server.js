const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const RedisStore = require('connect-redis')(session)
const passport = require("passport")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")
const cash = require("./cash")
const db = require("./db")
require("./passport")

express()
 .set("view engine", "hjs")
 .use(bodyParser.json())
 .use(bodyParser.urlencoded({extended: false}))
 .use(session({
   store: new RedisStore(),
   secret: "I love dogs",
   resave: false,
   saveUninitialized: false}))
 .use(passport.initialize())
 .use(passport.session())
 .use(authRoutes)
 .use(postRoutes)
 .get("/", cash.route({expire: 5, prefix: "home"}), (req, res, next) =>{
   setTimeout(() =>{
     const headlines = [
       "Fushia is new black",
       "What will Pacific Ocean do next?",
       "Wall street to build even more walls"
     ];
     res.render("headlines", {headlines: headniles})
   }, 2000)
 })
 .listen(3000)
