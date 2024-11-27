const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true,
  },
  userId: String,
  userName: String,
  carModel: String,
});

module.exports = {
  InquirySchema,
};
