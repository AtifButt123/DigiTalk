const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3,
  },
  nickName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3,
  },
  age: {
    type: Number,
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  friends: [{ type: mongoose.Types.ObjectId }],
  friendRequests: [{ type: mongoose.Types.ObjectId }],
}, {
  timestamps: true,
});

const Person = mongoose.model('persons', personSchema);
module.exports = Person;

