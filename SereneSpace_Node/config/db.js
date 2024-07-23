const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/SereneSpace', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to DB');
//   });
  
// mongoose.connection.on('error', (err) => {
//     console.error('Mongoose connection error:', err.message);
// });
  
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected from DB');
// });
  

// module.exports = connectDB;
