import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js";


import {Blog} from "./models/blog.models.js";

const app = express();
app.use(express.json());

dotenv.config({
    path: './env'
})

connectDB()

.then(() => {
    app.listen(process.env.PORT || 7000 , () => {
        console.log(`Server is running at port : ${
            process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!! ", err);
})

app.get('/', (req , res) => {
    res.send("Hello there this is working");
}); 

//  for getting the specific product by their id//
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const { id }=req.params;
        const blog =await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
// for getting all blogs//
app.get('/api/blogs', async(req,res) => {
    try {
        const blog=await Blog.find({});
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
// for creating new blogs//
app.post('/api/blogs', async (req, res) => {
    try {
    const blog= await Blog.create(req.body);
    res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


// update a blog //

app.put('/api/blogs/:id', async(req , res) => {
    try {
        const { id } =req.params;
        const blog= await Blog.findByIdAndUpdate(id, req.body);
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        const updatedblog=await Blog.findById(id);
    
        res.status(200).json(updatedblog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// for delete the product//

app.delete('/api/blogs/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const blog= await Blog.findByIdAndDelete(id);
        if(!blog) {
            return res.status(404).json({message: "Blog not found"});
        }

        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})