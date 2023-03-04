const mongoose = require("mongoose");

const postCompanies = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {},
  coordinates: {},
});

const PostCompanies = mongoose.model("PostCompanies", postCompanies);

module.exports = PostCompanies;
