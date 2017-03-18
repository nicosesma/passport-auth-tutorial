import User from '../app/models/user'

const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (request, email, password, done) => {
    console.log('in passport local startegy callback', request)
    process.nextTick(() => {
      User.findOne({'local.email': email }, (error, user) => {
        if(error)
          return done(error)

        if (user) {
          return done(null, false, request.flash('signupMessage', 'That email is already taken'))
        } else {
          const newUser = User()

          newUser.local.email = email

          newUser.local.password = newUser.generateHash(password)

          newUser.save((error) => {
            if (error)
              throw error

            return done(null, newUser)
          })
        }
      })
    })
  }))
}
