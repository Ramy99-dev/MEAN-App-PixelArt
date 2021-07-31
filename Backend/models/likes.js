const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const schema = mongoose.Schema({
    user: { type: ObjectId, required: true },
    post: { type: ObjectId, required: true }
})

const Like = mongoose.model('like', schema);

module.exports = Like;