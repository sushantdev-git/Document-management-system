const User = require('../model/user');
const Folder = require('../model/folder')
const sendMail = require('./SendMail');

const ShareFolder = async (req, res) => {
    
    const {email, folderId, view, del} = req.body;
    console.log(email, folderId, view, del);

    if(!email) return res.status(400).json({"mes":"email not provided"});
    if(!folderId) return res.status(400).json({"mes":"folderId not provided"});

    const user = await User.findOne({email});

    if(!user) return res.status(400).json({"mes":"User not found"})

    user.sharedFolderes.push({
        folder:folderId,
        view: view,
        delete: del,
    });

    await user.save();

    const folder = await Folder.findById(folderId);

    sendMail(`Folder ${folder.folderName}`, email);
}

module.exports = ShareFolder;