
const mongoose = require('mongoose')
const Schema = require('../schema')

const Activity = mongoose.model('Activity', Schema.ActivitySchema)

module.exports = Activity