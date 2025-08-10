const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const Auth = require('./middlewares/auth')
const Routes = require('./routes/index')

const UploadC = require('./controllers/upload.controller')
const multer = require('./multer/multer')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : '*',
}))

app.use(Routes.User)
app.use('/cart', Routes.Cart)
app.use('/store', Routes.Store)
app.use('/product', Routes.Product)
app.use('/settings', Routes.Settings)

app.post('/upload', /* Auth.getUser() */  UploadC.beforeUpload, multer.single('file'), UploadC.afterUpload)
app.post('/upload/reject', /* Auth.getUser() */  UploadC.reject)

module.exports = app;