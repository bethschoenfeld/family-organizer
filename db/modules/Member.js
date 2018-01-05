
const mongoose = require('mongoose')
const Schema = require('../schema')

const Member = mongoose.model('Member', Schema.MemberSchema)

module.exports = Member