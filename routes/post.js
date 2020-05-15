const express =  require("express");

const postController =  require("../controllers/post");

const router = express.Router();

const validator = require("../helpers/utility");

router.get("/", postController.test);

router.get("/user", postController.getUser);

router.post("/post", validator.createPostValidator, postController.createPost);

router.get("/post", postController.getPost);



module.exports = router;


