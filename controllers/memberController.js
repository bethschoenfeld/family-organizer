const express = require('express')
const router = express.Router({mergeParams: true})

const Family = require('../db/models/Family')

router.get('/', (req,res) => {
    const familyId = req.params.familyId

    Family.findById(familyId)
    .then((family) => {
        res.render('member/index', {
            family,
            familyId: family._id,
            member: family.members,
            title: 'Member Page'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/new', (req,res) => {
    const familyId = req.params.familyId

    res.render('member/new', {
        familyId,
        title: 'New Member'
    })
})

router.get('/:memberId/edit', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId

    Family.findById(familyId)
    .then((family) => {
        const member = family.members.id(memberId)
        res.render('member/edit', {
            familyId,
            memberId,
            member,
            family,
            title: 'Edit Page',
        })
    })
})

router.get('/:memberId', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId

    Family.findById(familyId)
    .then((family) => {
        const member = family.members.id(memberId)
        res.render('member/show', {
            familyId,
            member,
            title: 'Show Page',
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

router.post('/', (req,res) => {
    const familyId = req.params.familyId
    const newMember = req.body
        console.log(familyId, newMember)

    Family.findById(familyId)
    .then((family) => {
        family.members.push(newMember)
        return family.save()
    })
    .then(() => {
    res.redirect(`/family/${familyId}/members`)
    })
    .catch((error) => {
        console.log(error)
    })
})

router.put('/:memberId', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId
    const updatedMember = req.body

    Family.findByIdAndUpdate(familyId, updatedMember, {
        new: true
    })
    .then(() => {
        res.redirect(`/members/${{memberId}}`)
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/:memberId/delete', (req,res) => {
    const familyId = req.params.familyId
    const memberId = req.params.memberId

    Family.findById(familyId)
        .then((family) => {
            family.members.id(memberId).remove()
            return family.save()
        })
        .then(() => {
            res.redirect(`/family/${familyId}/members/`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router