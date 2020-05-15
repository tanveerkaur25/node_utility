exports.createPostValidator = (req, res, next) => {
    // title validations
    req.check("title", "Please enter a valid title").notEmpty();
    req.check("title", "Title length is not valid").isLength({
        min: 4,
        max: 20
    }); 

    // body validations
    req.check("body", "Please enter a valid Body").notEmpty();
    req.check("body", "Body length  is not valid").isLength({
      min: 4,
      max: 20
    }); 

    // check for errors
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error:firstError});
    }

    // proceed to next middleware
    next();
}



exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.status(401).json({error:'Unauthorised Access'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err)  res.status(403).json({error:'invalid token'});
    });
    
};