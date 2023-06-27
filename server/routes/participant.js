const express = require('express');
const participantController = require('../controllers/participant');

const router = express.Router();

router.post('/participants', participantController.createParticipant);
router.get('/participants', participantController.getAllParticipants);
router.get('/participants/:id', participantController.getParticipantById);
router.post('/participants/assign', participantController.assignSecretSantas);
router.delete('/participants/:id', participantController.deleteParticipant);
router.delete('/participants', participantController.deleteAllParticipants);
router.get('/secret-santas', participantController.getSecretSantas);


module.exports = router;
