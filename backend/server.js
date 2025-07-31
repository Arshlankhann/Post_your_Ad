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
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());


const uri = process.env.MONGO_URI;
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
