const express = require('express');
const cors = require('cors');
const { authenticate } = require('./middleware/auth');
const ordersRoutes = require('./routes/orders');
const { init } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'order-service' });
});

app.use('/api/orders', authenticate, ordersRoutes);

const PORT = process.env.PORT || 5003;
init().then(() => {
  app.listen(PORT, () => console.log(`order-service listening on ${PORT}`));
}).catch((err) => {
  console.error('Failed to init DB', err);
  process.exit(1);
});

module.exports = app;