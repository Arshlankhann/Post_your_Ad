const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

const uri = "mongodb+srv://arshlank894:qQCXopPCgvfV1eeP@cluster0.mfwzofy.mongodb.net/Highway_Delite?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const adRoutes = require('./routes/ad.routes');
app.use('/api/ads', adRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});