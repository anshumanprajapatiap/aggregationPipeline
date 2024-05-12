const express = require('express');
const dummyData = express.Router();
const {cleanAndGenerateData, cleanData, doc} = require('../dataGenerator/generator')

dummyData.route('/').get(doc)
dummyData.route('/cleanGenerate').post(cleanAndGenerateData)
dummyData.route('/clean').delete(cleanData)


module.exports = dummyData