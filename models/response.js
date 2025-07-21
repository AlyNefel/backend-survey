import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  giftCardChoice: {
    type: String,
    required: false
  },
  lastPackageIssue: {
    type: String,
    required: true,
    enum: ['Never', 'Within the last month', '1–3 months ago', 'Over 3 months ago']
  },
  issueDescription: {
    type: String,
    required: true
  },
  currentSetup: {
    type: String,
    required: true,
    enum: [
      'I\'m usually home',
      'Porch/doorstep with no security',
      'I use a lockbox or other device',
      'I leave instructions for the courier',
      'Other'
    ]
  },
  otherSetupDescription: String,
  lookedForProducts: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  productConsiderations: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Response = mongoose.model('Response', responseSchema);
export default Response;