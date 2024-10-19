const express = require('express');
const connection = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors');
const app=express();

app.use(cors());
connection.connect();

app.use(express.json());
console.log("1 step");
app.use('/api/users',require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});