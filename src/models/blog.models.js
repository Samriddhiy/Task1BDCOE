import mongoose from "mongoose"

const blogSchema = new mongoose.Schema (
    {
        title : {
            type: String,
            required: [true, "Please enter the title"],
        },
        description: {
            type: String,
            required: [true, "Please enter the description"],
        },
    }, {timestamps: true}
);

export const Blog = mongoose.model("Blog", blogSchema);