const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const fileSchema = new Schema({
  onwer: String,
  date: () => Date.now(),
  filename: {
    required: true,
    type: String,
  },
  fileId: {
    required: true,
    type: String,
  },
});

module.exports = File = mongoose.model("file", fileSchema);
