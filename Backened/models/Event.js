import mongoose from "mongoose";

const commentschema= new mongoose.Schema({
  emailid:{type:String,required:true},
  comment:{type:String,required:true}
})
const EventSchema = new mongoose.Schema({
  EventName: {
    type: String,
    required: [true, 'Event name must be provided'],
    minlength: [1, 'Event name must be at least 1 character long'],
    maxlength: [50, 'Event name must be at most 50 characters long']
  },
  EventDateAndTime: {
    type: String,
    required: [true, 'Event date and time must be provided'],
    minlength: [1, 'Event date and time must be at least 1 character long'],
    maxlength: [100, 'Event date and time must be at most 100 characters long']
  },
  ConductedBy: {
    type: String,
    required: [true, 'Conducted by must be provided'],
    minlength: [1, 'Conducted by must be at least 1 character long'],
    maxlength: [50, 'Conducted by must be at most 50 characters long']
  },
  EventInfo: {
    type: String,
    required: [true, 'Event info must be provided'],
    minlength: [1, 'Event info must be at least 1 character long'],
    maxlength: [500, 'Event info must be at most 500 characters long']
  },
  Eventlogo: {
    type: Object,
    required: [true, 'Event logo must be provided']
  },
  
  comments:[commentschema]
}, { timestamps: true });

export const event_ = mongoose.model('Event', EventSchema);
