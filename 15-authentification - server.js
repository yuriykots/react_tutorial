const express = require("express")
const sessions = require("express-sessions")
const passport = require("passport")

//require out passpot file.
require("/15-authentification-passport")
// We need to add database configuration. We can do in separate file to keep server.js clean.



express()
  .use(session({secret: "I love dogs", resave: false, saveUninitialized: false}))
  .use(passport.initialize())
  .use(passport.session())
  .get("/", (req, res, next) => {
    res.send(req.session)
  })
  .get("/set", (req, res, next) => {
    req.session.name = "yuriy"
    res.send(req.session)
  })
  .listen(3000)
