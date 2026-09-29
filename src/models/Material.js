const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            default: ""
        },

        filename: {
            type: String,
            default: ""
        },

        summary: {
            type: String,
            default: ""
        },

        flashcards: [
            {
                question: String,
                answer: String
            }
        ],

        quiz: [
            {
                question: String,
                options: [String],
                answer: String
            }
        ],

        studyPlan: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Material", materialSchema);