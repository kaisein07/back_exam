const jwt = require("jsonwebtoken");
const JWT_SECRET = "dasto123";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

const isProf = (req, res, next) => {
  if (req.user.profession !== "professeur") {
    return res.status(403).json({ message: "Accès réservé aux professeurs" });
  }
  next();
};

module.exports = { protect, isProf };
