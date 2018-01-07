const express = require('express')
const router = express.Router({mergeParams: true})

const Family = require('../db/models/Family')

router.get('/', (req,res) => {
    const familyId = req.params.familyId

    Family.findById(familyId)
    .then((family) => {
        res.render('member/index', {
            family,
            familyId: Family._id,
            member: family.member,
            title: 'Member Page'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/new', (req,res) => {
    const familyId = req.params.familyId

    res.render('members/new', {
        family,
        familyId,
        title: 'New Member'
    })
})

module.exports = router