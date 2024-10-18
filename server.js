const express = require('express');
const cors = require('cors');
const app=express();
const userRoutes = require('./routes/userRoutes');

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});