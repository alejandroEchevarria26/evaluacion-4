const mongoose = require('mongoose');

async function conectarDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pasteleria_kelita';
  await mongoose.connect(uri);
  console.log('MongoDB conectado:', uri);
}

module.exports = { conectarDB };
