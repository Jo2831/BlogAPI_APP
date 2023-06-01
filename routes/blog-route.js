import expres from "express";   // import express
import { addBlog, getAllBlog, updateBlog, getById, deleteBlog, getByUserId } from "../controllers/blog-controller.js";      // import blog controller

const route = expres.Router();        // create router

route.get("/", getAllBlog);       // get all blogs
route.post("/add", addBlog);    // add blog
route.put("/update/:id", updateBlog);     // update blog
route.get("/:id", getById);                // get blog by id
route.delete("/:id", deleteBlog);       // delete blog
route.get("/user/:id", getByUserId);    // get blog by user id

export default route;   // export router