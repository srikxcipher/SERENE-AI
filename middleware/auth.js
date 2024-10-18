const jwt=require('jasonwebtoken');

const authMiddleware=(req,res,next) =>{
    const token = req.headers['authorization'];
    if(!token) return res.status(403).json({error:'No token provided'});

    jwt.verify(token,'secret',(err, decoded) =>{
        if(err) return res.status(500).json({error: 'Failed to authenticate token'});
        req.userId = decoded.id;
        next();
    });
}