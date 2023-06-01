const mongoose = require('mongoose');
module.exports = main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', true);
  // await mongoose.connect('mongodb://localhost:27017/test');
  await mongoose.connect('mongodb://127.0.0.1:27017/test',{
    useNewUrlParser: true,
  })
}
