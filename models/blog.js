const mongoose = require("mongoose");

// Schema Constructor
const Schema = mongoose.Schema;

// Blogs Schema which defines the structure
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    // Auto assign values like "created at" and "updated at"
    timestamps: true
});

// Model -- mongoose will pluralize whatever's passed into mongoose.model() & look for that within the database
const Blog = mongoose.model("Blog", blogSchema);

// Export the moel
module.exports = Blog;

