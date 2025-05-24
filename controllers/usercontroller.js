const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dasto123";

const register = async(req, res)=>{
    const {username, email, password, profession}= req.body;
    try {
        const userExist = await User.findOne({email});
        if(userExist){
           return res.status(400).json({message:"utilisateur existe déjà"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username,email,password:hashedPassword, profession});
        await newUser.save();
        return res.status(200).json({message:"utilisateur créé"})
        
    } catch (error) {
        res.status(400).json({message:"erreur lors de la création "})
        
    }
}


const login = async(req, res) =>{
    const {email, password}= req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"utilisateur non trouvé"});
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(400).json({message:"mot de passe incorrect"})
        }
        const token = jwt.sign({id: user._id,profession: user.profession }, JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({token,
            message:"connexion reussie",
            user:{
            id:user._id,
            username:user.username,
            profession:user.profession
        }})
        
    } catch (error) {
        res.status(400).json({message:"erreur lors de la connexion"});
        
    }
}

module.exports = {register, login};