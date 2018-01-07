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

router.get('/:familyId/edit', (req, res) => {
    const familyId = req.params.familyId

    Family.findById(familyId)
        .then((family) => {
            res.render('family/edit', {
                family,
                title: 'Family Update'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.put('/:familyId', (req, res) => {
    const familyId = req.params.familyId
    const updatedFamilyInfo = req.body

    Family.findByIdAndUpdate(familyId, updatedFamilyInfo, {new: true})
        .then(() => {
            res.redirect(`/family/${familyId}`)
        })
})

router.get('/:familyId/delete', (req, res) => {
    const familyId = req.params.familyId

    Family.findByIdAndRemove(familyId)
        .then(() => {
            res.redirect('/family')
        })
        .catch((error) => {
            consosle.log(error)
        })
})

module.exports = router