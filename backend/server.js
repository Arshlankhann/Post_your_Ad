const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


const allowedOrigins = [
  'https://post-your-ad.vercel.app', 
  'http://localhost:3000'            
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());


const uri = "mongodb+srv://arshlank894:qQCXopPCgvfV1eeP@cluster0.mfwzofy.mongodb.net/Highway_Delite?retryWrites=true&w=majority&appName=Cluster0";
if (uri) {
  mongoose.connect(uri)
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.error("MONGO_URI is not defined in the environment variables.");
}


const adRoutes = require('./routes/ad.routes');
app.use('/api/ads', adRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
