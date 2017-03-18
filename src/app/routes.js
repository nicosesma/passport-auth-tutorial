module.exports = (app, passport) => {
  app.get('/', (request, response) => {
    response.render('index')
  })

  app.get('/login', (request, response) => {
    response.render('login', {message: request.flash('loginMessage')})
  })

  app.get('/signup', (request, response) => {
    response.render('signup', {message: request.flash('signupMessage')})
  })

  app.get('/profile', (request, response) => {
    const {user} = request
    response.render('profile', {
      user
    })
  })

  app.get('/logout', (request, response) => {
    request.logout()
    response.redirect('/')
  })
}

const isLoggedIn = (request, response, next) => {
  if (request.isAuthenticated)
    return next()

  response.redirect('/')
}
