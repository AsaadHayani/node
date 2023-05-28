const Post = require("../models/Post"),
  express = require("express"),
  multer = require("multer"),
  router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1048576, // 1 MB
  },
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
    image: req.file.filename,
  });
  try {
    const saved = await post.save();
    res.json(saved);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const posts = await Post.findByIdAndRemove(req.params.id);
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const posts = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
      },
      { new: true },
    );
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
