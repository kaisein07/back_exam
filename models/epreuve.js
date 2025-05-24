
const mongoose = require("mongoose");
const epreuvesSchema = mongoose.Schema({
    matiere:{
        type:String,
        required:true,
    },
    classe:{
        type:String,
        required:true,
    },
    ajouteur:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        require:true,
    },
    fichier:{
        type:String,
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model("Epreuve", epreuvesSchema);
