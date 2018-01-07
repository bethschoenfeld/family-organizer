const express = require('express')
const router = express.Router()
const Family = require('../db/models/Family')

router.get('/', (req, res) => {
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

router.get('/new', (req, res) => {
    res.render('family/new', {
        title: 'Make a new Family'
    })
})

router.post('/', (req, res) => {
    const newFamily = req.body

    Family.create(newFamily)
        .then(() => {
            res.redirect('/family')
        })
        .catch((error) => {
            console.log(error)
        })
})
router.get('/:familyId', (req, res) => {
    const familyId = req.params.familyId
    Family.findById(familyId)
        .then((family) => {
            res.render('family/show', {
                family,
                title: family.familyName
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router