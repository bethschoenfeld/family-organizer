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

Family.remove({}).then(() => {
    const schoenfeld = new Family ({
        username: 'Schoenfeld',
        email: 'schoenfeld@family.com'
    })
    const tiberius = new Member({
        name: 'Tiberius the Fierce',
        gender: 'male'
    })
    const chaseLaser = new Activity({
        title: 'Chase red dot',
        description: 'My nemisis the red dot needs to be taken out',
        location: 'My palace'
    })
    tiberius.activities.push(chaseLaser)

    const braille = new Member({
        name: 'Braille',
        gender: 'female'
    })
    const nap = new Activity({
        title: 'Nap',
        description: 'Nap in my favorite chair',
        location: 'living Room'

    })
    braille.activities.push(nap)

    schoenfeld.members.push(tiberius, braille)

    return schoenfeld.save()
}).catch((error) => {
    console.log('Error saving seeded data!')
    console.log(error)
}).then(() => {
    mongoose.connection.close()
    console.log('Finished seeding database. Disconnected from MongoDB')
})

