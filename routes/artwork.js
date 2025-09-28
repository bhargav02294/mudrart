const express = require("express");
const router = express.Router();
const Artwork = require("../server/models/artwork");



// CRUD routes
router.get("/", async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const newArt = new Artwork({ title, description, imageUrl });
        await newArt.save();
        res.status(201).json(newArt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Artwork.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Artwork.findByIdAndDelete(req.params.id);
        res.json({ message: "Artwork deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
