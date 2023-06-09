const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  size:{ type: String },
  color: { type: String },
  price: { type: String },

});
let Model = mongoose.model("Dress", modelSchema);
module.exports = Model;