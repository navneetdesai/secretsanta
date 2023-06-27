const Participant = require('../models/participant');


const participantController = {
  createParticipant: async (req, res) => {
    try {
      const { name, email } = req.body;
      const participant = await Participant.create({ name, email });
      res.status(201).json(participant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create participant'  + error});
    }
  },

  getAllParticipants: async (req, res) => {
    try {
      const participants = await Participant.find();
      res.status(200).json(participants);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve participants' });
    }
  },

  getParticipantById: async (req, res) => {
    try {
      const { id } = req.params;
      const participant = await Participant.findById(id);
      if (participant) {
        res.status(200).json(participant);
      } else {
        res.status(404).json({ error: 'Participant not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve participant' });
    }
  },


};

module.exports = participantController;
