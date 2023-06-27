const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  assignedRecipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant'
  }
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
