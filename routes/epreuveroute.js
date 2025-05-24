const express = require("express");
const path = require("path");
const { getepreuve, setpost, setedit, delect } = require("../controllers/epreuvecontroller");
const { protect, isProf } = require("../middleware/authmiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

/**
 * @swagger
 * /epreuve:
 *   get:
 *     summary: Récupère toutes les épreuves
 *     tags: [Epreuve]
 *     responses:
 *       200:
 *         description: Liste des épreuves
 */
router.get("/", getepreuve);

/**
 * @swagger
 * /epreuve:
 *   post:
 *     summary: Ajouter une nouvelle épreuve (réservé aux professeurs)
 *     tags: [Epreuve]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - matiere
 *               - classe
 *               - date
 *               - fichier
 *             properties:
 *               matiere:
 *                 type: string
 *               classe:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fichier:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Épreuve créée avec succès
 *       403:
 *         description: Accès refusé (non-professeur)
 */
router.post("/", protect, isProf, upload.single("fichier"), setpost);

/**
 * @swagger
 * /epreuve/{id}:
 *   put:
 *     summary: Modifier une épreuve existante
 *     tags: [Epreuve]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’épreuve
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               matiere:
 *                 type: string
 *               classe:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fichier:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Épreuve modifiée avec succès
 *       404:
 *         description: Épreuve non trouvée
 */
router.put("/:id", protect, isProf, upload.single("fichier"), setedit);

/**
 * @swagger
 * /epreuve/{id}:
 *   delete:
 *     summary: Supprimer une épreuve
 *     tags: [Epreuve]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l’épreuve
 *     responses:
 *       200:
 *         description: Épreuve supprimée
 *       404:
 *         description: Épreuve non trouvée
 */
router.delete("/:id", protect, isProf, delect);

/**
 * @swagger
 * /epreuve/download/{filename}:
 *   get:
 *     summary: Télécharger une épreuve (accessible aux élèves)
 *     tags: [Epreuve]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom du fichier à télécharger
 *     responses:
 *       200:
 *         description: Fichier téléchargé avec succès
 *       404:
 *         description: Fichier introuvable
 */
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: "Fichier introuvable" });
    }
  });
});

module.exports = router;
