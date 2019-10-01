const express = require('express')
const path = require('path')
const logger = require('morgan')

const users = require('../api/user')
const router = express.Router()

router.use(logger('dev'))

//pages routes
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'../pages/users.html'))
})
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'../pages/modal.html'))
})

//api routes
router.get('/api/user', users.getUser)
router.get('/api/user/:id', users.getUserById)
router.post('/api/user', users.postUser)
router.patch('/api/user', users.patchUser)
router.delete('/api/user/:id', users.deleteUser)





module.exports = router