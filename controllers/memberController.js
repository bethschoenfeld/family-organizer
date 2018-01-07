const express = require('express')
const router = express.Router({mergeParams: true})

const Family = require('../db/models/Family')

router.get('/', (req,res) => {
    const familyId = req.params.familyId

    familyId.findById(familyId)
    .then((family) => {
        res.render('/member/index', {
            familyId: Family._id,
            member: family.member,
            title: 'Member Page'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})
