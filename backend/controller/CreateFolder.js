const Folder = require('../model/folder');
const User = require('../model/user');

const CreateFolder = async (req, res) => {
    const {folderName} = req.body;

    console.log("create called")

    const user_id = req.firebaseUser.uid;

    if(!folderName) return res.status(400).json({"mes":"Folder name not found"});

    const user = await User.findOne({user_id});

    console.log(user)

    const newFolder = await Folder.create({
        folderName: folderName,
        onwer: user.email,
    })


    user.myFolders.push(newFolder._id);

    await user.save();

    //add folder to user

    res.status(200).json({"mes":"Folder created successfully"})
}

module.exports = CreateFolder