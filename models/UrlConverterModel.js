const mongoose = require("mongoose");

const baseUrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: [true,'Please enter a unique shortId'],
    },
    redirectURL: {
      type: String,
      required: true,
    },
    user_id:{
    type: String,
    }
});

const URLDocument = mongoose.model("baseURL", baseUrlSchema);

module.exports = URLDocument;
