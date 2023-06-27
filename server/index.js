const express = require('express');
const participantRoutes = require('./routes/participant');
const mongoose = require('mongoose');

const app = express();
const CONNECTION_STRING = 'mongodb://localhost:27017/secretsanta'


app.use(express.json());
app.use('/api', participantRoutes);
app.get('/', (req, res) => {
    res.send('<h1>Hello World! All set!</h1>');
});

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.log('Failed to connect to MongoDB', error);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
