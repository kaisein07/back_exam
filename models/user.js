const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true,
        enum:["professeur","eleve"],
        default:"eleve"
    }
})

module.exports = mongoose.model("user", userSchema);