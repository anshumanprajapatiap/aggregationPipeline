const express = require('express');
const aggregationRoute = express.Router();
const {displayData} = require('../controller/aggregation')

aggregationRoute.route('/').get(displayData)

module.exports = aggregationRoute