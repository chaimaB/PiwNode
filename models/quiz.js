const mongoose = require('mongoose');
var user = require('./user');

var propositionSchema = new mongoose.Schema({
    name: {
        type: String
    }
});
var responseSchema = new mongoose.Schema({
    rightResponse: {
        type: String
    },
    student: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
});
var questionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    propositions: [propositionSchema],
    response: [responseSchema],
    rightResponse: {
        type: String
    }
});
var quizSchema = new mongoose.Schema({
    name: {
        type: String
    },
    tutor: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
