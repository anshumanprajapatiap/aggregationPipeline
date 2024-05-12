require('dotenv').config(); // Load environment variables from .env file
// Import required modules
const express = require('express');

// Import required modules
const connectDB = require('./db/connect');
const dummyData = require('./routes/dummyData');
const aggregationRoute = require('./routes/aggregationRoute');

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


const start = async () => {

  try{
      const connectingString = `${process.env.method}://${process.env.dbHost}:${process.env.password}@${process.env.projectName}.${process.env.instanceName}/${process.env.dbName}?retryWrites=true&w=majority`;
      console.log(`CONNECTING TO DATABASE`);
      await connectDB(connectingString);
      app.listen(port, ()=>{
          console.log(`SERVING AT ${port}`);
          console.log(`APPLICATION STARTED`);
      })
  }catch(err){
      console.log(`Error ${err}`)
  }
}

// Start the server
start();