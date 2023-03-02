import mongoose from "mongoose";

const postCompanies = mongoose.Schema({
    companyName:String,
    companyAddress:{},
    coordinates:Number
});



const PostCompanies = mongoose.model("PostCompanies",postCompanies);

export default PostCompanies;