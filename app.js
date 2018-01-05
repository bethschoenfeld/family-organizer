require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

// view engine setup
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
})

mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB!!!")
})

mongoose.connection.on('error', (error) => {
  console.error(`
  MongoDB connection error!
  ${error}
  `)
  process.exit(-1)
})

const familyController = require('./controllers/familyController')
app.use('/family', familyController)

const memberController = require('./controllers/memberController')
app.use('/family/:familyId/members', membersController)

const activityController = require('./controllers/activityController')
app.use('/family/:familyId/members/:memberId/activity', activityController)


app.get('/', (req,res) => {
  response.redirect('/family')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`)
})

module.exports = app;
