const bcrypt= require("bcrypt-nodejs")
const knex = require("knex")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
// that's format for importing Local



//We will start using LocalStrategy
passport.use(new LocalStrategy(authenticate))
passport.use("local-register", new LocalStrategy({passReqToCallback: true}, register))
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

function register(req, email, password, done){
  db("users")
   .where("email", email)
   .first()
   .then((user) => {
     if (user) {
       return done(null, false, {message: "an account with that email already has been created"})
     }
     if (password !== req.body.password2) {
       return done(null, false, {message: "passwords doesn't match"})
     }
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: email,
      //password will be hashed. I still don't fully understand concept of salt.
      password: bcrypt.hashSync(pasword)
    };

    db("users")
      .insert(newUser)
      .then((ids) =>{
         newUser.id = ids[0]
         done(null, newUser)
       })
   })
  
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
