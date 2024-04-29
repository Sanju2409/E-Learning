const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
