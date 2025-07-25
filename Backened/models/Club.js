import mongoose from "mongoose";

const clubHeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  linkedin: { type: String, required: true },
  instagram: { type: String, required: false } // optional
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // EventName
  time: { type: String, required: true }, // EventDateAndTime
  club: { type: String, required: true }, // ConductedBy
  info: { type: String, required: true }, // EventInfo
  image: { type: String, required: true } // Eventlogo
}, { timestamps: true });

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  heading: { type: String, default: '' },
  info: { type: String, required: true },
  logo: { type: String, required: true },
  type:{type:String,required:true},
  clubHead: [clubHeadSchema],
  social: [{
    platform: { type: String },
    link: { type: String }
  }],
  events: [eventSchema]
});

export const Clubs_ = mongoose.model("clubs", clubSchema);
