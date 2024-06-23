
const { client }  = require('../db/connectMongoDb');

const db = client.db('disha_fashion');

const convertRequestBodyToPipeline = (reqBody) => {
  const pipeline = [];

  // Iterate over each key in the request body
  Object.entries(reqBody).forEach(([key, value]) => {
      // Add $ prefix to the key
      const prefixedKey = `$${key}`;

      // Construct the stage object
      const stageObj = { [prefixedKey]: value };
      pipeline.push(stageObj);
  });

  return pipeline;
};

const displayData = async (req, res) => {
    console.log("data")
    try {
        
        const collections = await db.listCollections().toArray();
        const data = {};
        
    
        // all collection 10 data
        // for (let collectionInfo of collections) {
        //   const collectionName = collectionInfo.name;
        //   console.log(collectionName);
        //   const collection = db.collection(collectionName);
        //   const documents = await collection.find().limit(1).toArray();
        //   data[collectionName] = documents;
        // }

        const collection = db.collection("analysis_collection");
        const documents = await collection.find().toArray();
        data['analysis_collection'] = documents;
    

        res.json({
          "data": data,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const filter = async (req, res) => {
    try {
      console.log(
        "--------------------------------------API CALL START----------------------------------------------"
      );
      const { user_id, start_date, period, zone, state, city } = req.body;
      const copydate = new Date(start_date);
      const newDate = new Date(copydate.setDate(copydate.getDate() + 1));
      const endDate = new Date(start_date);
  
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - period);
      console.log("startDate", startDate);


      const user = await userModel.findById({ _id: user_id });


      let storeIds = [];
      if (user.user_role === "Super Admin" || user.user_role === "NHQ") {
        const stores_arr = await storeModel.find({ zone: zone ? zone : { $exists: true }, state: state ? state : { $exists: true }, city: city ? city : { $exists: true }, }, { _id: 1 }).lean();
        storeIds = stores_arr.map(store => store._id);
        console.log(storeIds, stores_arr);
      } else {
        storeIds = user.stores;
      }



      const collections = await db.listCollections().toArray();
      const reqData = req.body;
  
      // const pipeline = convertRequestBodyToPipeline(reqData);

        
  
      const collectionName= "user_collection";
      const collection = db.collection(collectionName);
  
      const count = await collection.countDocuments();
      const result = await collection.aggregate(pipeline).toArray();
  
      res.json({
        "orignalDocumentRecordList": count,
        "data": result,
        "pipeline": pipeline
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {displayData, filter}