import  express  from "express";
import mongoose from "mongoose";
import router from "./routes/user-route.js";
import route from "./routes/blog-route.js";

const app = express();

app.use(express.json());
app.use("/api/user", router);  
app.use("/api/blog", route);
mongoose.connect('mongodb+srv://admin:<password>@cluster0.bvenl7e.mongodb.net/?retryWrites=true&w=majority')
.then(() => app.listen(5000))
.then(() => console.log('Connected to database'))
.catch((err) => console.log(err));
