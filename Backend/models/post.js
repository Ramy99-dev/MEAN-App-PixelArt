const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;


const schema = mongoose.Schema({
    user: { type: ObjectId, required: true },
    title: { type: String, required: true },
    file: { type: String, required: true },
    desc: String
});

const Post = mongoose.model('Post', schema);

module.exports = Post;