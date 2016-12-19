const password = require("password")
const router = require("router")
const db = require("../db")


function loginRequired(req, res, next ){
  if(!req.isAuthenticated(){
    res.redirect("/login ")
  }
  next()

}

router
 .get("/post", loginRequired, (req, res, next) => {
   db("posts")
    .where("user_id", req.user.id)
    .then((posts) =>{
      res.render("posts", {
        title: "your posts",
        posts: "posts",
      })
    })
 })
  .get("/allPosts", (req, res, next) => {
    db("posts")
     .then((posts) => {
       res.render("posts", {
         title: "all user posts",
         posts: posts,
       })
     })
  })
  .get("/deletePosts/:id", (req, res, next) => {
    db("posts")
      .where("id", req.param.id)
      .delete()
      .then((result) =>{
        if(result === 0 ) {
          return res.send("Error, couldn't delete post")
        }
        res.redirect("/allPosts")
      })
  })

  module.exports = router
