const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGOURI);
const connectToDatabase = async () => {
  try {
    await client.connect();
    return {status: true, message: `CONNECTING TO DATABASE`};
  } catch (error) {
    return {status: false, message: `FAIL TO DATABASE |  ERROR: ${error}`};;
  }
}


module.exports = {connectToDatabase, client}