import mongoose from "mongoose";
// const eventSchema = new mongoose.Schema({
//   name: String,
//   time: String,
//   location: String,
//   info: String,
//   image: String,
// });

// const clubHeadSchema = new mongoose.Schema({
//   name: String,
//   about: String,
//   email: String,
//   image: String,
//   linkedin: String,
// });

// const socialSchema = new mongoose.Schema({
//   instagram: String,
//   linkedin: String,
//   facebook: String,
// });

// const clubSchema = new mongoose.Schema({
//   name: String,
//   heading: String,
//   info: String,
//   logo: String,
//   events: [eventSchema],
//   clubHead: [clubHeadSchema],
//   social: [socialSchema],
// });

// export const Club = mongoose.model("Club", clubSchema);

// import mongoose from "mongoose";
// const clubheadschema = new mongoose.Schema({
//   Clubheadname: { type: String, required: false },
//   Clubheadphotourl: { type: String, required: false },
//   Clubheadinfo: { type: String, required: false },
//   Clubheademail: { type: String, required: false },
//   Clubheadlindin: { type: String, required: false },
// });
// const Event = new mongoose.Schema(
//   {
//     EventName: {
//       type: String,
//       required: false,
//       minlength: [1, "Event name must be at least 1 characters long"],
//       maxlength: [50, "Event name must be at most 50 characters long"],
//     },
//     EventDateAndTime: {
//       type: String,
//       required: false,
//       minlength: [1, "Event date and time must be provided"],
//       maxlength: [
//         100,
//         "Event date and time must be at most 100 characters long",
//       ],
//     },
//     ConductedBy: {
//       type: String,
//       required: false,
//       minlength: [1, "Conducted by must be provided"],
//       maxlength: [50, "Conducted by must be at most 50 characters long"],
//     },
//     EventInfo: {
//       type: String,
//       required: false,
//       minlength: [1, "Event info must be provided"],
//       maxlength: [500, "Event info must be at most 500 characters long"],
//     },
//     Eventlogo: { type: String, required: false },
//   },
//   { timestamps: true }
// );
// const socialSchema = new mongoose.Schema({
//   platform: String,
//   link: String,
// });

// const clubs = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },

//   // type: {
//   //   type: String,
//   //   required: false,
//   //   enum: ["technical", "cultural", "sports"],
//   // },
//   info: { type: String, required: false },
//   logo: { type: String, required: false },
//   Clubinstaurl: { type: String, required: false },
//   Clublinkdinurl: { type: String, required: false },
//   // Clubhead: clubheadschema,
//   // Events: [Event],
//  Events: [Event],
//   Clubhead: [clubheadschema],
//   social: [socialSchema],

// });
// export const Clubs_ = mongoose.model("Club", clubs);









const clubheadschema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  linkedin: String,
  instagram: String,
}, { _id: false });

const socialSchema = new mongoose.Schema({
  platform: String,
  link: String,
}, { _id: false });

const eventSchema = new mongoose.Schema({
  EventName: String,
  EventDateAndTime: String,
  ConductedBy: String,
  EventInfo: String,
  Eventlogo: String,
}, { timestamps: true });

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  heading: { type: String },
  info: { type: String },
  logo: { type: String },
  clubHead: [clubheadschema],       // ✅ Fix: match your seed structure
  social: [socialSchema],           // ✅ Added social
  events: [eventSchema],
});

export const Clubs_ = mongoose.model("Club", clubSchema);
