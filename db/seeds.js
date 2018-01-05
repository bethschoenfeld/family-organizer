require('dotenv').congfig()
const Family = require('./models/Family')
const Member = require('./models/Members')
const Activity = require('./models/Activty')
const mongoose = require('mongoose')

mongoose.connect(process.eventNames.MONGODB_URI, {
    useMongoClient: true
})

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`MongoDB connction error!!! ${error}`)
    process.exit(-1)
})

Family.remove({}).(() => {
    const schoenfeld = new Family ({
        username: 'Schoenfeld',
        email: 'schoenfeld@family.com'
    })
    const tiberius = new Member({
        name: 'Tiberius the Fierce',
        gender: 'male',
    })
    const chaseLaser = new Activity({
        title: 'Chase red dot',
        description: 'My nemisis the red dot needs to be taken out',
        location: 'My palace'
    })
})

