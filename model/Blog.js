import mongoose from 'mongoose';   // import mongoose

const Schema = mongoose.Schema;
 // create blog schema
const blogSchema = new Schema({     // create blog schema
    title: {
        type: String,
        required: true
    },                  // create title field
    description: {
        type: String,
        require: true,
    },                  // create description field
    image: {
        type: String,
        require: true
    },                  // create image field
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },              // create user field

});

export default mongoose.model('Blog', blogSchema);    // export blog model
