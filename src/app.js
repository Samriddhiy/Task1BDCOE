import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.get('/', (req , res) => {
    res.send("Hello there this is working");
});

app.post('/api/blogs', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});










app.use(cors({
    origin:process.env.CORS_Origin,
    credentials: true
}));
app.use(express.json({limit: "30kb"}));
app.use(express.urlencoded({extended:true , limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());
export { app };