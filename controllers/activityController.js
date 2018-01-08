const express = require('express')
const router = express.Router({mergeParams: true})

const Family = require('../db/models/Family')

router.get('/new', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId

    Family.findById(familyId)
    .then((family) => {
        const member = family.members.id(memberId)

        res.render('activity/new', {
            familyId,
            member,
            title: 'New Activity'
        })
    })
})

router.post('/', (req,res) => { 
    const familyId = req.params.familyId
    const memberId = req.params.memberId
    const newActivity = req.body

    Family.findById(familyId)
    .then((family) => {
        const member = family.members.id(memberId)
        member.activity.push(newActivity)

        return family.save()
    })
    .then(() => {
        res.redirect(`/family/${familyId}/members/${memberId}`)
    })
})

router.get('/:activityId', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId
    const activityId= req.params.activityId

    Family.findById(familyId)
        .then((family) => {
            const member = family.members.id(memberId)
            const activity = member.activity.id(activityId)

            res.render('/activity/show', {
                familyId,
                member,
                activity,
                title: 'Activities'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router