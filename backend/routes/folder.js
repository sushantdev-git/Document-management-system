const express = require('express')
const CreateFolder = require('../controller/createFolder');
const fetchFolder = require('../controller/FetchFolder');
const ShareFolder = require('../controller/ShareFolder');

const router = express.Router()


router.post('/create', CreateFolder);
router.post('/fetch', fetchFolder);
router.post('/shareFolder', ShareFolder);

module.exports = router