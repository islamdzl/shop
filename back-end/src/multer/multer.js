const multer = require('multer')
const { v4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, 'uploads/temp/')
  },
  filename: (req, file, cb) => {

    const fileName = v4() + path.extname(file.originalname)
    req.fileName = fileName;
    cb(null, fileName)
  }
});

const upload = multer({ storage });

module.exports = upload;
