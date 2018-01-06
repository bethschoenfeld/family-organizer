const express = require('express')
const router = express.Router()
const Family = require('../db/models/Family')

router.get('/', (req,res) => {
    Family.find({})
        .then((family) => {
            res.render('family/index', {
                family,
                pageTitle: 'Family Page'
            })
        })
        .catch((error) => {
            console.log(error)
        })
}) 

module.exports = router