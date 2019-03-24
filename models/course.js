const mongoose = require('mongoose');
var ressources = require('./ressources');
var tutor = require('./user');
var quiz = require('./quiz');

var courseSchema = new mongoose.Schema({

    title: {
        type: String
    },
    startDate :{
        type: Date
    },
    endDate :{
        type: Date
    },
    description: {
        type: String
    },
    objectives: {
        type: String
    },
    category: {
        type: String
    },
    period: {
        type: Number
    },
    ressources: [{type:mongoose.Schema.Types.Object,ref:'Ressources'}],
    tutorCreator: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    quiz: {type:mongoose.Schema.Types.Object,ref:'Quiz'}
});

module.exports = mongoose.model('Course', courseSchema);
