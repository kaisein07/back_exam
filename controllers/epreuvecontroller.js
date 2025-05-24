
const Epreuve = require("../models/epreuve");
const EpreuvesModel= require("../models/epreuve");

module.exports.getepreuve = async(req, res) =>{
    const epreuves = await EpreuvesModel.find()
    res.status(200).json(epreuves)

};



module.exports.setpost = async (req, res) => {
    try {
      if (req.user.profession !== "professeur") {
        return res.status(403).json({ message: "Accès réservé aux professeurs" });
      }
      console.log(req.body);
      console.log(req.file);
  
      const { matiere, classe, date } = req.body;
      const nouvelleEpreuve = await Epreuve.create({
        matiere,
        classe,
        ajouteur: req.user.id,
        date,
        fichier: req.file ? req.file.filename : null

      });
  
      res.status(201).json(nouvelleEpreuve);
    } catch (error) {
      console.error("Erreur:", error.message);
      res.status(500).json({ message: "Erreur lors de l'ajout de l'épreuve", error: error.message });
    }
  };
module.exports.setedit = async(req, res) =>{
    const epreuve = await EpreuvesModel.findById(req.params.id);
    if(!epreuve){
        res.status(400).json({message:"cette epreuve n'existe pas"})
        
    }
    
    const updateEpreuve = await EpreuvesModel.findByIdAndUpdate(req.params.id,
        { $set: req.body }, 
        { new: true, runValidators: true });
    
    res.status(200).json(updateEpreuve)

}
module.exports.delect = async(req, res)=>{
    const epreuve = await EpreuvesModel.findById(req.params.id);
    if(!epreuve){
        res.status(400).json({message:"cette epreuve n'existe pas"})
        
    }
    await epreuve.deleteOne();
    return res.status(200).json({message:"supprimé id"+req.params.id});  

}