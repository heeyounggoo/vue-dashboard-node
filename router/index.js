const express = require('express')
const router = express.Router()

const table = require('./table')
const login = require('./login')

router.use('/table', table)
router.use('/login', login)


module.exports = router