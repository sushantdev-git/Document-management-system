const Folder = require('../model/folder')

const fetchFolder = async (req, res) => {
    const {folderId} = req.body;

    if(!folderId) return res.status(400).json({"mes":"folder Id not provided"});

    const folder = await Folder.findById(folderId).populate('files');

    res.status(200).json(folder);
}

module.exports = fetchFolder;