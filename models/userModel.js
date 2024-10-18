const db=require('../config/database');

const User = {
    create: (userData, callback) => {
        const sql = `INSERT INTO users (username,email,password) VALUES (?,?,?)`;
        db.query(sql, [userData.username,userData.email,userData.password], callback);

    },
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql,[email],(error, results));

        callback(error,results);
        
    }
};

module.exports=User;
