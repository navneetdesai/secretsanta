

const randomUnique = require('random-unique');

const assignSecretSantas = (participants) => {
    if (participants.length < 2) {
      throw new Error('Insufficient participants to assign Secret Santas');
    }
  
    const shuffledParticipants = [...participants];
  for (let i = shuffledParticipants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
  }

  const assignments = shuffledParticipants.map((participant, index) => ({
    participantId: participant._id,
    secretSantaId: shuffledParticipants[(index + 1) % shuffledParticipants.length]._id,
  }));

  return assignments;
  
  };

module.exports = assignSecretSantas;
