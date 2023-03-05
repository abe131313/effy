const PostCompanies = require("../models/companies.js");

module.exports.createCompany = async (req,res) => {
    try {
        const {companyName,companyAddress,coordinates} = req.body;
        console.log(req.body);
        let newCompany = await new PostCompanies({companyName,companyAddress,coordinates});
        await newCompany.save();
        res.status(200).send("company registered successfully");
    } catch (error) {
        res.send(error);
    }
    // console.log('hello its in create company');
}


module.exports.getCompanies = async (req,res) => {
    try {
        let companyData = await PostCompanies.find({});
        res.send(companyData);
    } catch (error) {
        console.log(error);
    }
}