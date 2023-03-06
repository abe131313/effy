const PostCompanies = require("../models/companies.js");
const PostUsers = require("../models/users2.js");

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

module.exports.deleteCompany = async (req,res) => {
    try {
        let val = req.body.companyName;
        let companyData = await PostCompanies.deleteMany({companyName:`${val}`});
        let userData = await PostUsers.deleteMany({ company_name: `${val}`});
    } catch (error) {
        console.log(error);
    }
}