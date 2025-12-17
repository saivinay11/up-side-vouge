const { pool } = require('../config/db');

async function createOrder(req, res) {
  try {
    const { productId, size, quantity, totalAmount } = req.body;
    if (!productId || !size || !quantity || !totalAmount) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const result = await pool.query(
      'INSERT INTO orders (user_id, product_id, size, quantity, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, productId, size, quantity, totalAmount]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listOrdersByUser(req, res) {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createOrder, listOrdersByUser };