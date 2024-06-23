require('dotenv').config(); // Load environment variables from .env file
// Import required modules
const mongoose = require('mongoose')
const express = require('express');

// Import required modules
const connectDB = require('./db/connect');
const { connectToDatabase }  = require('./db/connectMongoDb');
const dummyData = require('./routes/dummyData');
const aggregationRoute = require('./routes/aggregationRoute');
const storeRoute = require('./routes/store')

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000
console.log(`APPLICATION INITALIZATION STARTED`);
app.use(express.json());



// Define a route for the homepage
app.get('/', (req, res) => {
  res.status(200).json(
    {
      success: true, 
      message: "Welcome to Learn Aggregation Pipeline Application", 
      data: {
      "GENERATE DUMMY DATA": "/api/generator",
    }
  })
});




// routes
app.use('/api/generator', dummyData);
app.use('/api/aggregation', aggregationRoute);
app.use('/api/store', storeRoute);

const start = async () => {

  try{
      const connectingString = `${process.env.method}://${process.env.dbHost}:${process.env.password}@${process.env.projectName}.${process.env.instanceName}/${process.env.dbName}`;
      console.log(`CONNECTING TO DATABASE`);
      // await connectDB(connectingString);
      // await connectMongoDB(process.env.MONGOURL);
      const result = await connectToDatabase();
      if(result.status){
        console.log(result.message);
          app.listen(port, ()=>{
            console.log(`SERVING AT ${port}`);
            console.log(`APPLICATION STARTED`);
        })
      }else{
        console.log(result.message);
        return;
      }
     
  }catch(err){
      console.log(`Error ${err}`)
  }
}

// Start the server
start();