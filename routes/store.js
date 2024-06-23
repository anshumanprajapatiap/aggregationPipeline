const express = require('express');
const storeRoute = express.Router();
const {displayData, filter} = require('../controller/store')

storeRoute.route('/data').get(displayData)
storeRoute.route('/filter').post(filter)

module.exports = storeRoute