const path = require('node:path');
const { randomBytes } = require('node:crypto');
const multer = require('multer');

const uploadPath = path.resolve('public', 'pdfs', 'notice');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      console.log(file)
      file.key = `${randomBytes(16).toString('hex')}-${file.originalname}`;
      cb(null, file.key);
    },
  }),
};

const config = {
  dest: uploadPath,
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};

module.exports = config;
