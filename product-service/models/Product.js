const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  sizes: { type: [String], enum: ['S', 'M', 'L', 'XL'], default: ['S', 'M', 'L', 'XL'] }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);