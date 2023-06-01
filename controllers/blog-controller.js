import Blog from "../model/Blog.js" // import Blog model
import User from "../model/User.js" // import User model
import mongoose from "mongoose"; // import mongoose

export const getAllBlog = async (req, res, next) => { //    get all blog
    let blogs; //    declare blogs variable
    try {               //    try to get all blog
        blogs = await Blog.find();   //    get all blog
    } catch (err) {     //    if error
        console.log(err);      //    log error
    }
    if (!blogs) {       //    if no blog found
        return res.status(404).json({ message: "no blog found" });      //    return no blog found
    }
    return res.status(200).json({ blogs });   //    return all blog
}
export const addBlog = async (req, res, next) => {  //    add blog

    const { title, description, image, user } = req.body;  //    get title, description, image, user from request body

    let existingUser;    //    declare existingUser variable
    try {      //    try to find user
        existingUser = await User.findById(user);   //    find user
    } catch (err) {   //    if error
        console.log(err);    //    log error
    }
    if (!existingUser) {   //    if no user found
        return res.status(400).json({ message: "user does not exists" });   //    return user does not exists
    }


    const blog = new Blog({     //    create new blog
        title,    
        description,
        image,
        user,
    });  
    try {  //    try to save blog
        const session = await mongoose.startSession();   //    start session
        session.startTransaction();     //    start transaction
        await blog.save({ session: session });   //    save blog
        existingUser.blogs.push(blog);    //    push blog to user
        await existingUser.save({session: session});    //    save user
        await session.commitTransaction();      //    commit transaction
    } catch (err) {   //    if error
        return console.log(err);    //    log error
        return res.status(500).json({ message: err });   //    return error
    }
    return res.status(201).json({ message: "blog created", blog });     //    return blog created
}

export const updateBlog = async (req, res, next) => {      //    update blog
   const { title, description } = req.body;           //    get title, description from request body
    const blogId = req.params.id;              //    get blog id from request params
    let blog;                   //    declare blog variable
    try {                    //    try to update blog
        blog = await Blog.findByIdAndUpdate(blogId, { title, description });        //    update blog
    } catch (err) {             //    if error
        return console.log(err);            //    log error
    }
    if (!blog) {                //    if no blog updated
        return res.status(404).json({ message: "no blog updated" });        //    return no blog updated
    }
    return res.status(200).json({ message: "blog updated", blog });          //    return blog updated
}

export const getById = async (req, res, next) => {              //    get blog by id
    const blogId = req.params.id;        //    get blog id from request params
    let blog;           //    declare blog variable
    try {
        blog = await Blog.findById(blogId);             //    find blog by id
    } catch (err) {         //    if error
        return console.log(err);        //    log error
    }
    if (!blog) {        //    if no blog found
        return res.status(404).json({ message: "no blog found" });      //    return no blog found
    }
    return res.status(200).json({ blog });          //    return blog
}

export const deleteBlog = async (req, res, next) => {   //    delete blog
    const blogId = req.params.id;    //    get blog id from request params
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user');   //    find blog by id and delete
        await blog.user.blogs.pull(blogId);         //    pull blog from user
        await blog.user.save();             //    save user
    } catch (err) {
        return console.log(err);            //    log error
    }
    if (!blog) {
        return res.status(404).json({ message: "no blog found" });      //    return no blog found
    }
    return res.status(200).json({ message: "blog  deleted"});           //    return blog deleted
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;           //    get user id from request params
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");      //    find user by id and populate blogs
    } catch (err) {
        return console.log(err);        //    log error
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "no blog found" });              //    return no blog found
    }
    return res.status(200).json({ userBlogs });             //    return user blogs
}