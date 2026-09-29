const express = require("express");
const router = express.Router();

const {
    createMaterial,
    summarizeMaterial
} = require("../controllers/materialController");

const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Upload/create material
router.post(
    "/upload",
    protect,
    upload.single("file"),
    createMaterial
);

// Generate AI summary
router.post(
    "/:id/summarize",
    protect,
    summarizeMaterial
);

module.exports = router;