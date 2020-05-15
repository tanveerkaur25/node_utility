const Post = require("../models/postModel");

exports.test = (req, response) => {
  response.send("controller implemented yeyeyeyyey");
};

exports.getPost = (req, response) => {
    const posts = Post.find().select("_id title body")
    .then((posts) => {
        response.json({posts})
    })
    .catch(err =>  console.log(err));
  
};

exports.getUser = (req, response) => {
    response.json({
        posts: [
            {title: "test"},
            {title: "test3"},
            {title: "test1"}
        ]
    });
}


exports.createPost = (req, res) => {
    const post = new Post(req.body);
    post.save()
    .then(result => {
        res.status(200).json({
            post: result
        })
    })
   
}