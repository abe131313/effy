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
