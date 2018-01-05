onst mongoose = require('mongoose')
const Schema = require('../Schema')
 
const Family = mongoose.model('Family', Schema.FamilySchema)

module.exports = Family