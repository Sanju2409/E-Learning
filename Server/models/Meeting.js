// const mongoose = require('mongoose');

// const EventSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     startTime: {
//         type: Date,
//         required: true
//     },
//     endTime: {
//         type: Date,
//         required: true
//     },
//     staffId: {
//         // type: mongoose.Schema.Types.ObjectId,
//         // ref: 'Staff', // Reference to the Staff model
//         type: String,
//         required: true
//     }
// });

// const EventModel = mongoose.model("Event", EventSchema);
// module.exports = EventModel;
const mongoose = require('mongoose');
const meetingSchema = new mongoose.Schema({
    staffId: String,
    date: String,
    time: String,
    info: String,
  });
  
  const Meeting = mongoose.model('Event', meetingSchema);
  module.exports=Meeting;
