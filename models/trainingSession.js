const mongoose = require('mongoose');


var trainingSessionSchema = new mongoose.Schema({

    name: {
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
    tutor: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    studentsList: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    courses: [{type:mongoose.Schema.Types.ObjectId,ref:'Course'}],
    quiz: {type:mongoose.Schema.Types.Object,ref:'Quiz'}
    });

module.exports = mongoose.model('TrainingSession', trainingSessionSchema);
