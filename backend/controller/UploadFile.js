const File = require('../model/file');
const User = require('../model/user')
const Folder = require('../model/folder')

const {gfs} = require('../config/sotrage');

const UploadFile = async (req, res) => {

    console.log("file uploaded")
    const {folderId} = req.body;
    if(!folderId){
        return res.status(400).json({"mes":"folderId not found"});
    }

    const file = req.file;


    const newFile = await File.create({
      owner: "Random",
      filename: file.filename,
      fileId: file.id,
    });

    const theFolder = await Folder.findById(folderId);

    theFolder.files.push(newFile._id);

    await theFolder.save();

    res.status(200).json({"mes":"File uploaded succesfully"});
}

module.exports = UploadFile;