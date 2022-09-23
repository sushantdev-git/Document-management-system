const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto')
const path = require('path');

const storage = new GridFsStorage({
    url: process.env.DATABASE_URI,
    file: (req, file) => {

        console.log("uploading file data grid", file)
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: file.originalname,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        })
        // return new Promise((resolve, reject) => {
        //     crypto.randomBytes(16, (err, buf) => {
        //         if (err) {
        //             return reject(err);
        //         }
        //         const filename = buf.toString('hex') + path.extname(file.originalname);
        //         const fileInfo = {
        //             filename: filename,
        //             bucketName: 'uploads'
        //         };
        //         resolve(fileInfo);
        //     });
        // });
    }
});


const upload = multer({ storage });

module.exports = upload;
