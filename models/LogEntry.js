const mongoose = require('mongoose');

const LogEntrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Users',
      // default: 'Marco',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LogEntry', LogEntrySchema);
