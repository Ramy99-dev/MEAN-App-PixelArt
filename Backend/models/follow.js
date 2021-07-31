const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const schema = mongoose.Schema({
    user: { type: ObjectId, require: true },
    follower: { type: ObjectId, require: true }
});

const Follow = mongoose.model('Follow', schema);

module.exports = Follow;