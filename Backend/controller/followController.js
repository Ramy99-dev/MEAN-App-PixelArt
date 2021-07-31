const Follow = require('../models/follow');
const ObjectId = require('mongodb').ObjectID
/**
 * Follow user
 */
const addFollow = (req, res) => {
    let follow = new Follow({
        user: ObjectId(req.body.user_id),
        follower: ObjectId(req.user.result)
    })
    follow.save()
        .then((result) => {
            res.json(result)
            
        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * get number of followers 
 */
const getFollow = (req, res) => {
    Follow.find({ user: ObjectId(req.query.user_id) })
        .then((result) => {
            res.json({ number_followers: result.length })
        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * Test if a user follow another user .
 */
const getUserFollow = (req, res) => {

    Follow.findOne({ user: ObjectId(req.query.user_id), follower: ObjectId(req.user.result) })
        .then((result) => {
            if (result == null) {
              
                res.json({ follow: false })
            }
            else {
               
                res.json({ follow: true, follow_id: result._id })
            }

        })
        .catch((err) => {
            console.log(err)
        })
}
/*
* unfollow user
*/
const deleteFollow = (req, res) => {
    
    Follow.remove({ _id: ObjectId(req.body.follow_id) })
        .then((result) => {
            console.log("Deleted Succesfully")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    addFollow,
    getFollow,
    deleteFollow,
    getUserFollow
}