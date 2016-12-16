const bcrypt= require("bcrypt-nodejs")
const knex = require("knex")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
// that's format for importing Local



//We will start using LocalStrategy
passport.use(new LocalStrategy(authenticate))
//we will need to asycronictly check
function authenticate(email, password, done){
  db("users")
    .where("email", email)
    .first()
    .then((user) => {
      if(!user || !bcrypt.compareSync(password, user.password)){
        return done(null, false, {message: "invalid user and password combination"})
      }
      done(null, user)
    }, done)
}

//creating a hash and storing in session
passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  db("users")
   .where("id", id)
   .first()
   .then((user) =>{
     done(null, user)
   })

})
