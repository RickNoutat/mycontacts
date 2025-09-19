
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI manquant dans .env');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('✅ Connecté à MongoDB');
};
