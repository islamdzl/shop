const multer = require('multer')
const Utils = require('../../utils/index')
const path = require('path')
const LocalDB = require('../../services/localDb/index')

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, path.join(__dirname, '../../uploads/temp'))
  },

  filename: function (req, file, cb) {
    try {
      const ext = path.extname(file.originalname)
      const packageId = req.params.packageId;
      const uniqueName = `${Utils.Uuid.generateUuid(10)}${ext}`;

      LocalDB.Uploads.exist({packageId}, async(exist)=> {
        
        if (!exist) {
          return cb(new Error('Invalid packageId in save file'))
        }
  
        const pushed = await LocalDB.Uploads.pushFileInWaiting(packageId, uniqueName)
  
        if (!pushed) {
          return cb(new Error('Error in pushFileInWaiting'))
        }
  
        cb(null, uniqueName)
      })

    } catch (error) {
      cb(error)
    }
  }

})

function imageFilter(req, file, cb) {

  const allowed = ['image/jpeg', 'image/png', 'image/webp']

  if (allowed.includes(file.mimetype)) cb(null, true)

  else cb(new Error('Invalid available image type'))
}

const upload = multer({ storage, fileFilter: imageFilter })

module.exports = upload
