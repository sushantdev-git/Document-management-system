const User = require('../model/user');
const File = require('../model/file')
const sendMail = require('./SendMail');

const ShareFile = async (req, res) => {
    
    const {email, fileId, view, del} = req.body;

    if(!email) return res.status(200).json({"mes":"email not provided"});
    if(!fileId) return res.status(200).json({"mes":"fileId not provided"});

    const user = await User.findOne({email});

    if(!user) return res.status(200).json({"mes":"User not found"})

    user.sharedFiles.push({
        file: fileId,
        view: view,
        delete: del,
    });

    await user.save();

    const file = await File.findById(fileId);

    sendMail(`Folder ${file.filename}`, email);
}

module.exports = ShareFile;