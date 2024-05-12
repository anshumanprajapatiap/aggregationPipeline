const University = require('../model/university'); 
const Course = require('../model/course'); 
const coursesData = require('./coursesData');
const universitiesData = require('./universityData');

const cleanUpFunction = async () =>{
    // Delete all universities
    const universityCleanupResult = await University.deleteMany({});

    // Delete all courses
    const courseCleanupResult = await Course.deleteMany({});


      return {
        coursesDeleted: courseCleanupResult,
        universityDeleted: universityCleanupResult
    };
}


const generatonFunction = async () =>{
    
  try {
    // Combine insertion operations
    const [universities, courses] = await Promise.all([
        University.insertMany(universitiesData),
        Course.insertMany(coursesData)
    ]);
    // Return the number of rows added for universities and courses
    return {
        universitiesCount: universities.length,
        coursesCount: courses.length
    };
  } catch (error) {
      console.error('Error adding data:', error);
      throw error; // Rethrow the error to be caught by the caller
  }
}

const cleanAndGenerateData = async (req, res) =>{
    try {
        const cResult = await cleanUpFunction();
        const gResult = await generatonFunction();
        res.status(201).json(
          {
            success: true, 
            message: "Data Cleaned and Generated", 
            data: {
              "cleanUpResult": cResult,
              "generationResult": gResult
            }
          }
        )
    } catch (err) {
        res.status(500).json({success: false, error: err})
    }

    
}

const cleanData = async (req, res) =>{
    try {
        const result = await cleanUpFunction();
        res.status(200).json({success: true, message: "Data Cleaned", result: result});
      } catch (error) {
        console.error('Error cleaning data:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }

    
}


const doc = (req, res) => {
  res.status(200).json(
    {
      success: true, 
      message: "API Documentation", 
      data: {
        "CLEAN GENERATE DUMMY DATA": "/cleanGenerate",
        "CLEAN DATA": "/clean"
      }
    }
  );
};

module.exports = {
    cleanAndGenerateData,
    cleanData,
    doc
}