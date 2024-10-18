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


