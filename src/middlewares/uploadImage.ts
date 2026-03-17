const multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
  //@ts-ignore
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Folder where the images will be stored
  },
  //@ts-ignore
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File name
  }
});
const upload = multer({ storage: storage });

export const uploadImageMiddleware = upload.single('image');
