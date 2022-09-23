const express = require('express');
const UserProfile = require('../controller/UserProfile');

const router = express.Router()

router.post('/profile', UserProfile)

module.exports = router