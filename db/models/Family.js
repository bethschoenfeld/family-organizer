const mongoose = require('mongoose')
const Schema = require('../schema')

const Family = mongoose.model('Family', Schema.FamilySchema)

module.exports = Family