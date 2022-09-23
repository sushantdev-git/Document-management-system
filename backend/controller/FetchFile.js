const {mongoose} = require('mongoose')

const fetchFile = async (req, res) => {
    
    const {fileId} = req.body;

    if(!fileId)  return res.status(200).send({"msg":"file Id not provided"});

    const db = mongoose.connection.db;
    const gfs = new mongoose.mongo.GridFSBucket(db, {
        bucketName:"uploads",
    })

    if(!fileId) return res.status(400).json({"msg":"fileId not found"});

    gfs.find(new mongoose.Types.ObjectId(fileId)).toArray((err, files) => {
        
        if (!files[0] || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files available',
            });
        }
        gfs.openDownloadStreamByName(files[0].filename).pipe(res);

    });

}

module.exports = fetchFile;