const path = require("path");
const router = require("express").Router();
// Note route
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/notes.html"));
})

// All the other routes
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"));
})

module.exports = router;