const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const folderSchema = new Schema({
  onwer: String,
  date: () => Date.now(),
  folderName: reqString,
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: "file",
    },
  ],
});

module.exports = Folder = mongoose.model("folder", folderSchema);
