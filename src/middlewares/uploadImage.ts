const multer = require('multer');

const storage = multer.diskStorage({
  destination: (
    _req: any,
    _file: any,
    cb: (err: null, dest: string) => void
  ) => {
    cb(null, './uploads');
  },
  filename: (
    _req: any,
    file: { originalname: string },
    cb: (err: null, filename: string) => void
  ) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

export const uploadImageMiddleware = upload.single('image');
