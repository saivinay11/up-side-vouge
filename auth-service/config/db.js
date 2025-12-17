const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: 'authdb' });
  console.log('MongoDB connected (auth-service)');
}

module.exports = { connectDB };