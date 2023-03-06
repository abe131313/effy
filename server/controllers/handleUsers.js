const PostUsers = require("../models/users2.js");

module.exports.postUsers = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      designation,
      date_of_birth,
      company_name,
      active,
    } = req.body;
    let newUser = await new PostUsers({
      first_name,
      last_name,
      email,
      designation,
      date_of_birth,
      company_name,
      active,
    });
    await newUser.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    res.send(error);
  }
  // console.log('hello its in create company');
};

module.exports.fetchUsersUnderCompany = async (req, res) => {
  let usersData = await PostUsers.find({
    company_name: req.body.thecompName,
  }).exec();
  res.status(200).send(usersData);
};

module.exports.deletUsers = async (req, res) => {
  try {
    console.log(req.body.first_name);
    let response = await PostUsers.deleteOne({ first_name: req.body.first_name });
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateUsers = async (req,res) => {
    try {
        let response = await PostUsers.updateMany({first_name:req.body.first_name});
        res.status(200).send('deleted');
    } catch (error) {
        console.log(error);
    }
}
