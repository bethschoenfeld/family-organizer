const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ActivitySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Need a title']
        },
        description: {
            type: String
        },
        location: {
            type: String
        }
    }
)

const MemberSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Need a name!']
        },
        gender: {
            type: String
        }
    }

)