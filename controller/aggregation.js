const University = require('../model/university');

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
    const pipeline = [
        { $match : { name : 'USAL' } },
        { $unwind : '$students' },
        { $project : { _id : 0, 'students.year' : 1, 'students.number' : 1 } },
        { $sort : { 'students.number' : -1 } }
    ]
    const data = await University.aggregate(pipeline);

    res.status(200).json({success: true, data: data, pipeline: pipeline});
};

const displayDataWith = async (req, res) => {
    const reqData = req.body;
    const pipeline = convertRequestBodyToPipeline(reqData);

    try{
        const data = await University.aggregate(pipeline);

        res.status(200).json({success: true, data: data, pipeline: pipeline});
    } catch(e){
        res.status(200).json({success: true, error: e, pipeline: pipeline});
    }
   
};

const displayDataWithExplain = async (req, res) => {
    const reqData = req.body;
    const pipeline = convertRequestBodyToPipeline(reqData);

    try{
        const data = await University.aggregate(pipeline);

        // Execute aggregation pipeline with explain option set to "executionStats"
        const explanation = await University.aggregate(pipeline, { explain: "executionStats" });
        

        // res.status(200).json({success: true, data: data, explanation: explanation});

        // Read the HTML file containing the template
        fs.readFile('./explain.html', 'utf8', (err, htmlContent) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                res.status(500).json({ success: false, message: "Internal server error" });
            } else {
                // Replace placeholders in the HTML template with actual data
                const populatedHtml = htmlContent
                    .replace('{{data}}', JSON.stringify(data))
                    .replace('{{explanation}}', JSON.stringify(explanation));
                
                // Send the populated HTML content as the response
                res.status(200).send(populatedHtml);
            }
        });

    } catch(e){
        console.error(`error: ${e}`);
        res.status(200).json({success: true, error: e, pipeline: pipeline});
    }
   
};


module.exports = {
    displayData,
    displayDataWith,
    displayDataWithExplain
}