const Material = require("../models/Material");
const { generateSummary } = require("../utils/gemini");

// CREATE MATERIAL
const createMaterial = async (req, res) => {
    try {
        const { title, subject, content } = req.body;

        if (!title || !subject) {
            return res.status(400).json({
                message: "Title and subject are required"
            });
        }

        if (!req.file && !content) {
            return res.status(400).json({
                message: "Please upload a file or provide content"
            });
        }

        const material = await Material.create({
            user: req.user.id,
            title,
            subject,
            content: content || "",
            filename: req.file ? req.file.filename : ""
        });

        res.status(201).json({
            message: "Study material created successfully",
            material
        });

    } catch (error) {
        console.error("Material creation error:", error);

        res.status(500).json({
            message: "Failed to create study material",
            error: error.message
        });
    }
};


// GENERATE AI SUMMARY
const summarizeMaterial = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (!material) {
            return res.status(404).json({
                message: "Study material not found"
            });
        }

        if (material.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to access this material"
            });
        }

        if (!material.content) {
            return res.status(400).json({
                message: "Material has no content to summarize"
            });
        }

        const summary = await generateSummary(material.content);

        material.summary = summary;
        await material.save();

        res.status(200).json({
            message: "Summary generated successfully",
            summary
        });

    } catch (error) {
        console.error("Summary generation error:", error);

        res.status(500).json({
            message: "Failed to generate summary",
            error: error.message
        });
    }
};


module.exports = {
    createMaterial,
    summarizeMaterial
};