const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { username, email, password } = req.body;
    //checking if the user exists
    User.findByEmail(email, (error, users) => {
        if (error) return res.status(500).json({ error: 'Error checking for the user' });
        if (users.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err)
                return res.status(500).json({ error: 'Error hashing password' });
            const newUser = { username, email, password: hash };
            User.create(newUser, (erroe, result) => {
                if (error) return res.status(500).json({ error });
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
};

const login =(req,res) =>{
    const {email,password} = req.body;
    User.findByEmail(email, (error,users) =>{
        if(error || users.length === 0 ) return res.status(400).json({error:'User not found'});
        const user=users[0];

        bcrypt.compare(password, user.password, (err, isMatch)=> {
            if(!isMatch) return res.status(401).json({error:'Invalid credentials'});
            const token = jwt.sign({id: user.id, email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'});
            res.status(200).json({token});
        });
    });
};

module.exports ={register, login};

