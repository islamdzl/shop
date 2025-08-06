const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Validations = require('./validations/auth.user.validate')
const app = express()

const Routes = require('./routes/index')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : '*',
}))

app.use(Routes.User)
app.use('/cart', Routes.Cart)
app.use('/store', Routes.Store)
app.use('/product', Routes.Product)
app.use('/uploads', Routes.Uploads)
app.use('/upload', /* Validations.getUser, */ Routes.Upload)

module.exports = app;