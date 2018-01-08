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
    },
    {
        timestamps: {}
    }

)

const MemberSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Need a name!']
        },
        age: {
            type: Number,
            required: [true, 'Need an age']
        },
        activities: [ActivitySchema]
    },
    {
        timestamps: {}
    }

)

const FamilySchema = new Schema(
    {
        familyName: {
            type: String,
            required: [true, 'Need username!']
        },
        
        members: [MemberSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    FamilySchema,
    MemberSchema,
    ActivitySchema
}
