import mongoose from "mongoose";

const AnnounceSchema = new mongoose.Schema({
   clubname: {
      type: String,
      required: [true, 'Club name must be provided'],
      minlength: [1, 'Club name must be at least 1 character long'],
      maxlength: [50, 'Club name must be at most 50 characters long']
   },
   heading: {
      type: String,
      required: [true, 'Heading must be provided'],
      minlength: [1, 'Heading must be at least 1 character long'],
      maxlength: [100, 'Heading must be at most 100 characters long']
   },
   info: {
      type: String,
      required: [true, 'Info must be provided'],
      minlength: [1, 'Info must be at least 1 character long'],
      maxlength: [500, 'Info must be at most 500 characters long']
   },
   announcelogo: {
      type: Object,
      required: [true, 'Announcement logo must be provided']
   }
}, { timestamps: true });

export const Announce_ = mongoose.model('Announce', AnnounceSchema);
