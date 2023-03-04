const PostCompanies = require("../models/companies.js");

module.exports.createCompany = async (req,res) => {
    try {
        const {companyName,companyAddress,coordinates} = req.body;
        console.log(req.body);
        let newCompany = await new PostCompanies({companyName,companyAddress,coordinates});
        await newCompany.save();
        res.status(200).send("company registered successfully");
    } catch (error) {
        console.log(error);
    }
    // console.log('hello its in create company');
}