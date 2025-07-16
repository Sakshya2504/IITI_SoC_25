import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: [3, 'Name must be at least 3 characters long'], maxlength: [20, 'Name must be at most 20 characters long'] },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w.-]+@iiti\.ac\.in$/, 'Email must be a valid @iiti.ac.in address']
      },
    password: {
        type: String,
        required: true,
    },
    userphoto:{type:String,required: [true,"Please Upload Profile Image"] }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);