const express = require('express')
const router = express.Router()
const Family = require('../db/models/Family')

router.get('/', (req,res) => {
    Family.find({})
        .then((family) => {
            res.render('family/index', {
                family,
                title: 'Family Organizer'
            })
        })
        .catch((error) => {
            console.log(error)
        })
}) 

router.get('/new', (req,res) => {
    res.render('family/new', {title: 'Make a new Family'})
})


module.exports = router