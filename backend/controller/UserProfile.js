const User = require("../model/user");

const UserProfile = async (req, res) => {

    const user_id = req.firebaseUser.uid;
  const user = await User.findOne({ user_id })
    .populate("myFolders")
    .populate("sharedFolderes")
    .populate("sharedFiles");

    res.status(200).json(user);
};

module.exports = UserProfile;
