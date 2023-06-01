import mongoose from "mongoose";            // import mongoose

const schema = mongoose.Schema;             // create schema

const userSchema = new schema({         // create user schema
    name: {
        type: String,
        required: true
    },                                  // create name field
    email: {
        type: String,
        required: true,
        unique: true
    },                              // create email field
    password: {
        type: String,
        required: true,
        minlength: 6
    },                        // create password field
    blogs:[{type: mongoose.Types.ObjectId, ref: 'Blog', required: true}],   // create blogs field
});

export default mongoose.model('User', userSchema);                  // export user model
