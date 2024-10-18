const User = require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const register = (req,res) =>{
    const{username,email,password }=req.body;
    bcrypt.hash(password, 10,(err,hash) =>{
        if(err)
            return res.status(500).json({error: 'Error hashing password'});
        const newUser={username,email,password: hash};
        User.create(newUser,(erroe, result) =>{
            if(error) return res.status(500).json({error});
            res.status(201).json({message: 'User registered successfully'});
        });
    });
};


