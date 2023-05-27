const multer = require("multer"),
  path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const validExt = [".png", ".jpg", ".jpeg"];
  if (!validExt.includes(path.extname(file.originalname))) {
    return callback(new Error("Only .png .jpg & .jpeg Format Allowed"));
  }

  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 1048576) {
    return callback(new Error("File Size is Big"));
  }
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576, // 1 MB
});

module.exports = upload.single("productImage");
