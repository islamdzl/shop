const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/upload.controller')
const router = express.Router();
const LocalDB = require('../localDb/index')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/temp'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
  
    req.uniqueName = uniqueName;
    cb(null, req.uniqueName);
  }
});

function imageFilter(req, file, cb) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];

  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only images are allowed'));
}

const upload = multer({ storage, fileFilter: imageFilter});

router.post('/:packageId', uploadController.before, upload.single('image'), uploadController.after);

module.exports = router;
