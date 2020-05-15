const brcypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = async (req, response) => {

    if (!req.body) response.status(200).json({ error: "Please Fill required details" });

    const user = await User.findOne({
        email:req.body.email
    }).select('password');

    try{
        const passwordMatch = await brcypt.compare(req.body.password, user.password);
        if (!user || !passwordMatch){ response.status(401).json({error: 'Invalid email or password'});
        }else{
            const user = { username: req.body.username }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
            response.status(200).json({ success: 'Login Sucessfull', token: accessToken });
        }

    }catch{
        response.status(201).json({ error:"Invalid email or password"});
    }

};

exports.createUser = async (req, response) => {

    try{
         const salt = await brcypt.genSalt();
         const hashPassword = await brcypt.hash(req.body.password, salt);
         req.body.password = hashPassword;
         const user = new User(req.body);
         user.save()
             .then(result => {
                 response.status(200).json({
                   user: result
                 });
             })
             .catch(err => {
                 console.log(err);
                 response.status(200).json({
                     error: err
                 });
            });
       }catch{
        response.status(200).json({
            error: 'Something Went Wrong'
        });
    }
    
  
};
