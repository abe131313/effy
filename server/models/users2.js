const mongoose = require('mongoose');

const schema = mongoose.Schema;


const postUsers = new schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{},
    designation:{
        type:String
    },
    date_of_birth:{},
    company_name:{},
    active:{
        type:Boolean
    }

})

const PostUsers = mongoose.model("PostUsers", postUsers);

module.exports = PostUsers;