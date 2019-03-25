const mongoose = require('mongoose');
var userSchema = require('../models/user');
var responses = require('../models/response');
var user = require('./user');
var responses = require('./response');

var postSchema = new mongoose.Schema({

    subject: {
        type: String
    },
    description: {
        type: String
    },
    datePost :{
        type: Date,
        default: Date.now
    },
    userPost: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    responses: [{type:mongoose.Schema.Types.Object,ref:'Response'}]
});

module.exports = mongoose.model('Post', postSchema);
