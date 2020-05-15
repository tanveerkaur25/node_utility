const mongoose  = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required",
    minlength: 4,
    maxlength: 10
  },
  body: {
    type: String,
    required: "Body is required",
    minlength: 4,
    maxlength: 100
  }
});


module.exports = mongoose.model("Post", postSchema);