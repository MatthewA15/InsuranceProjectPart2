const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  //any other fields
});

const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim;
