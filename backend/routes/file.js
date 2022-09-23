const express = require('express')

const router = express.Router()
const UploadFile = require('../controller/UploadFile');
const FetchFile = require('../controller/FetchFile')

const upload = require('../config/sotrage');
const ShareFile = require('../controller/ShareFile');

router.post('/uploadFile', upload.single("file"), UploadFile);
router.post('/fetchFile', FetchFile);
router.post('/shareFile', ShareFile);

module.exports = router;