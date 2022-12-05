const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    // image:{
    //     type: String,
    //     required: true,
    // },
    mobile_no:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
})

// model with schema
module.exports = mongoose.model("User", userSchema,"user");