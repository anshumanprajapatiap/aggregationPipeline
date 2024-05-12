const University = require('../model/university');


const displayData = async (req, res) => {
    const data = await University.aggregate([
        { $match : { name : 'USAL' } },
        { $unwind : '$students' },
        { $project : { _id : 0, 'students.year' : 1, 'students.number' : 1 } },
        { $sort : { 'students.number' : -1 } }
      ]);

    res.status(200).json({success: true, data: data});
};

module.exports = {
    displayData
}