import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import flash from 'connect-flash'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import path from 'path'

const configDB = require('./config/database.js')

const port = process.env.PORT || 8000

mongoose.connect(configDB.url)

// require('./config/passport.js')(passport)

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(session({secret: 'ec33c86b2ccc3d7cc1ea000eb6214f5ab1263c55'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./app/routes.js')(app, passport)

app.listen(port)
console.log(`The port is listening at http://localhost:${port}`)

