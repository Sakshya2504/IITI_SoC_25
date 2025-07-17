import mongoose from "mongoose";
const { Schema } = mongoose;

const RegisSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name must be at most 50 characters'],
    },

    EmailAddress: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w.-]+@iiti\.ac\.in$/, 'Email must be a valid @iiti.ac.in address']
    },

    RollNumber: {
        type: String,
        required: [true, 'Roll number is required'],
        unique: true,
        minlength: [9, 'Roll number must be at least 9 digits'],
        maxlength: [12, 'Roll number must be at most 12 digits'],
        trim: true // optional, in case users paste spaces
    },
    Program: {
        type: String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String, // Changed to string for exact 10-digit control
        required: true,
        unique: true,
        length: [10,"Enter Valid Mobile Number"]
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Regis = mongoose.model("Regis", RegisSchema);
export { Regis };