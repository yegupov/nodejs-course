const path = require('path')
const multer = require('multer');
const fs = require('fs') // For delete files

// const uploadDir = 'public/img';
const uploadDir = path.resolve(__dirname, '../public/img');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir)
  },
  filename(req, file, cb) {
    cb(null, `${(new Date().toISOString().replace(/:/g, '-')).slice(0, -5)}-${file.originalname}`)
  }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

// module.exports = multer({
//   storage, fileFilter
// });

module.exports.upload = multer({
  storage,
  fileFilter,
  limits: {fileSize: 1024 * 1024 * 5}
})

const deleteFile = (fileBook) => {

  const fileNameWithPath = uploadDir + '/' + fileBook;
  console.log('fileName With Path', fileNameWithPath);

  if (fs.existsSync(fileNameWithPath)) {
    console.log('Есть такой файл');
  } else {
    console.log('Нет такого файла');
  }

  try {
    fs.unlinkSync(fileNameWithPath);
    console.log('Old Image deleted');
  } catch (e) {
    console.log('Error deleting image!', fileBook);
  }
}

module.exports.delete = deleteFile
