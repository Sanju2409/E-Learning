// Define the schema for the collection
const mongoose = require('mongoose');
const materialSchema=new mongoose.Schema( {
    courseId: {
        type: String,
        required: true
      },
     staffId: {
        type: String,
        required: true
      },
      filePath: {
        type: String,
        required: true
      }
})
const materialModel = mongoose.model("storematerials", materialSchema );
module.exports = materialModel


