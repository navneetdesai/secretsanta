const express = require('express');
const participantRoutes = require('./routes/participant');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const CONNECTION_STRING = 'mongodb://localhost:27017/secretsanta'
const PORT = 8080;

app.use(cors());
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





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Server stopped, MongoDB connection closed.');
    process.exit(0); 
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});