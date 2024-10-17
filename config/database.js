const mysql = require('mysql2');

//Create a connection to the database
const connection = mysql.createConnection({
    host:'localhost',
    user:'serene_user',
    password:'password_serene_user',
    database: 'serene_ai'
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