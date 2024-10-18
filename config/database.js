const mysql = require('mysql2');
require('dotenv').config();
//Create a connection to the database
const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

//Connecting to mySql
connection.connect(err => {
    if(err){
        console.error('Error connecting to Mysql:',err);
        return;
    }
    console.log('Connected to MySQL database.');
});

//Export the connection
module.exports=connection;