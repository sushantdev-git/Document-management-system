const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const userSchema = new Schema({
  user_id: reqString, //this is the user_id that we will get from firebase
  email: String,
  myFolders: [
    {
      type: Schema.Types.ObjectId,
      ref: "folder",
    },
  ],
  sharedFolderes: [
    {
      folder:{
        type: Schema.Types.ObjectId,
        ref: "folder",
      },
      view: Boolean,
      delete: Boolean,
    },
  ],
  sharedFiles: [
    {
      file:{
        type: Schema.Types.ObjectId,
        ref: "file",
      },
      view: Boolean,
      delete: Boolean,
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
