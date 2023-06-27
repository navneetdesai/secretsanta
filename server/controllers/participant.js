const Participant = require("../models/participant");
const assignSecretSantas = require("../utils/random-assignment");
const validator = require("validator");

const participantController = {
  createParticipant: async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is invalid" });
      }

      const participant = await Participant.create({ name, email });
      res.status(201).json(participant);
    } catch (error) {
      res.status(500).json({ error: "Failed to create participant" + error });
    }
  },

  getAllParticipants: async (req, res) => {
    try {
      const participants = await Participant.find();
      res.status(200).json(participants);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve participants" });
    }
  },

  deleteParticipant: async (req, res) => {
    try {
        const { id } = req.params;
        const deletedParticipant = await Participant.findOneAndDelete({
            _id: id,
          });
      
          if (!deletedParticipant) {
            return res.status(404).json({ error: 'Participant not found.' });
          }
      
          res.json({ message: 'Participant deleted successfully.' });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete participant" });
    }
    },
    

  getParticipantById: async (req, res) => {
    try {
      const { id } = req.params;
      const participant = await Participant.findById(id);
      if (participant) {
        res.status(200).json(participant);
      } else {
        res.status(404).json({ error: "Participant not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve participant" });
    }
  },

  assignSecretSantas: async (req, res) => {
    try {
      const participants = await Participant.find();
      const assignments = assignSecretSantas(participants);
      //   console.log(assignments);

      for (const assignment of assignments) {
        const { participantId, secretSantaId } = assignment;
        const participant = await Participant.findById(participantId);
        if (!participant) {
          return res.status(404).json({ error: "Participant not found" });
        }

        await Participant.updateOne(
          { _id: participantId },
          { $set: { assignedRecipient: secretSantaId } }
        );
        await participant.save();
      }

      res.status(200).json({ message: "Secret Santas assigned successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Failed to assign Secret Santas.",
          details: `${error}`,
        });
    }
  },
};

module.exports = participantController;
