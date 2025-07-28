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
        lowercase: true, // ensures casing doesn't mess up uniqueness
        match: [/^[\w.-]+@iiti\.ac\.in$/, 'Must be a valid @iiti.ac.in email']
    },

    RollNumber: {
        type: String,
        required: [true, 'Roll number is required'],
        minlength: [9, 'Roll number must be at least 9 characters'],
        maxlength: [12, 'Roll number must be at most 12 characters'],
        trim: true
    },
    Program: {
        type: String,
        required: [true, 'Program is required'],
    },
    Branch: {
        type: String,
        required: [true, 'Branch is required'],
    },
    PhoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]\d{9}$/, 'Enter a valid 10-digit mobile number']
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, 'Event ID is required'],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
RegisSchema.index({ EmailAddress: 1, eventId: 1 }, { unique: true });


const Regis = mongoose.model("Regis", RegisSchema);
export { Regis };
