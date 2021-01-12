const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    role: String
    //questions:[{type:Schema.Types.ObjectId, ref:"Questions"}]
  }, {
    timestamps: true
  });


module.exports = mongoose.model('Users', userSchema);