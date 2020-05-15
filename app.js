const express = require('express');
const app = express();
const morgan = require("morgan");
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config() //invoke to access enviroenment variable

const bodyParser = require("body-parser");

const expressValidator = require("express-validator");

app.use(bodyParser.json());

app.use(expressValidator());

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");


app.use("/", postRoutes);

app.use("/user", authRoutes);

// middleware -- executes in the middle when something is happeining

const port = process.env.PORT;  
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});