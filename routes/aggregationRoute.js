const express = require('express');
const aggregationRoute = express.Router();
const {displayData, displayDataWith, displayDataWithExplain} = require('../controller/aggregation')

aggregationRoute.route('/').get(displayData)
aggregationRoute.route('/custom').post(displayDataWith)
aggregationRoute.route('/customExplain').post(displayDataWithExplain)

module.exports = aggregationRoute