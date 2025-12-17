const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'auth-service' });
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`auth-service listening on ${PORT}`));
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

module.exports = app;