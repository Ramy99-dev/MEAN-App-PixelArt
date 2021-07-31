const Like = require('../models/likes');
const ObjectId = require('mongodb').ObjectID;

/** 
* Like post
*/
const addLike = (req, res) => {
    let like = new Like({
        user: req.user.result,
        post: req.body.post_id
    })
    like.save()
        .then((res) => {
            console.log('saved Succesfully')
        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * Return if the user liked or not the post
 */
const getUserLike = (req, res) => {


    Like.findOne({ user: req.user.result, post: req.query.post_id })
        .then((result) => {
            if (result == null) {

                res.json({ like: false })
            }
            else {
                res.json({ like: true, like_id: result._id })
            }

        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * dislike  post
 */
const removeLike = (req, res) => {

    Like.remove({ _id: req.body.like_id })
        .then((res) => {
            console.log('Deleted Succefully ')
        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * Return the number of likes foreach post
 */
const getPostLikes = (req, res) => {
    Like.find({ post: req.query.post_id })
        .then((result) => {
            res.json({ likes_number: result.length })
        })
        .catch(err => console.log(err))

}

const groupPosts = (req, res) => {
    Like.aggregate(
        [
            { $match: {} },
            { $group: { _id: "$post", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]
    ).then((result) => {
        res.send(result.slice(0, 3))
    })
}
module.exports = {
    addLike,
    getUserLike,
    removeLike,
    getPostLikes,
    groupPosts
}