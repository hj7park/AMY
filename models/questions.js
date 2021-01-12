const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default:5},
  username: {type:Schema.Types.ObjectId, ref:"Users"}
})

const answerSchema = new Schema({
    answer: String,
    ratings: [ratingSchema],
    username: {type:Schema.Types.ObjectId, ref:"Users"}
},{
  timestamps: true
});

const questionSchema = new Schema({
    question: String,
    answers: [answerSchema],
    popularity: {type:Number, default:0},
    username: {type:Schema.Types.ObjectId, ref:"Users"}
},{
  timestamps: true
});


module.exports = mongoose.model('Questions', questionSchema);