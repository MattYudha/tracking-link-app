const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  ip: String,
  country: String,
  region: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

const trackingLinkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  trackingId: { type: String, required: true, unique: true },
  visits: [visitSchema],
});

module.exports = mongoose.model("TrackingLink", trackingLinkSchema);
