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
        member.activities.push(newActivity)

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
            const activity = member.activities.id(activityId)

            res.render('activity/show', {
                familyId,
                member,
                memberId,
                activity,
                title: 'Activities'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:activityId/delete', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId
    const activityId= req.params.activityId

    Family.findById(familyId)
        .then((family) => {
            const member = family.members.id(memberId)
            const activity = member.activities.id(activityId)
            member.activities.id(activityId).remove()

            return family.save()
        })
        .then(() => {
            res.redirect(`/family/${familyId}/members/${memberId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router