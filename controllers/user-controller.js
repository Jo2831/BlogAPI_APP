import User from "../model/User.js";  // import User model
import bcrypt from "bcryptjs";      // import bcryptjs for password hashing

export const getAllUser = async (req, res, next) => {   // get all users
    let users;
    try {
        users = await User.find();          // find all users
    } catch (err) {
        console.log(err);           // log error
    }
    if (!users) {
        return res.status(404).json({ message: "no user found" });      // if no user found
    }
    return res.status(200).json({ users });         // if user found
}

export const signup = async (req, res, next) => {           // signup user
    const { name, email, password, } = req.body;            // get name, email, password from request body

     let existingUser;                                  // declare existingUser variable

     try {
        existingUser = await User.findOne({ email });  // find user by email
     } catch(err) {
       return console.log(err);
     }
     if (existingUser) {
        return res.status(400).json({ message: "user already exists" });    // if user exists
     }
        let hashedPassword = bcrypt.hashSync(password);   // hash password
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });     // create new user
        try {
            await createdUser.save();
        } catch(err) {
           return console.log(err);
        }
        return res.status(201).json({ message: "user created", createdUser });  // if user created
     }

    export const login = async (req, res, next) => {   // login user
        const { email, password } = req.body;        // get email, password from request body
        let existingUser;
        let isValidPassword;
        try {
            existingUser = await User.findOne({ email });      // find user by email
        } catch(err) {
            return console.log(err);
        }
        if (!existingUser) {
            return res.status(404).json({ message: "user does not exits"});     // if user does not exist
        }
        try {
            isValidPassword = await bcrypt.compareSync(password, existingUser.password);    // compare password
        }   catch(err) {
            return console.log(err);
        }
        if (!isValidPassword) {
            return res.status(400).json({ message: "invalid password"});   // if password is invalid
        }
        return res.status(200).json({ message: "login successful"});   // if login successful
    }