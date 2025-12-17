const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'product-service' });
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5002;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`product-service listening on ${PORT}`));
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

module.exports = app;