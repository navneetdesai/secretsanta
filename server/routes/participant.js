const express = require('express');
const participantController = require('../controllers/participant');

const router = express.Router();

// Participant routes
router.post('/participants', participantController.createParticipant);
router.get('/participants', participantController.getAllParticipants);
router.get('/participants/:id', participantController.getParticipantById);

module.exports = router;
