require('dotenv').config();
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');

const addUser = (req, res) => {
  User.findOne({ 'email': req.body.email })
    .then((result) => {
      if (result == null) {

        let user = new User(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            img: null,
            ROLE: 'USER'
          }
        )
        user.save()
          .then((result) => {
            res.json({ msg: 'added Succesflly', created: true })
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else {
        res.json({ msg: "Account Already Exist", created: false })
      }
    })

}

const login = (req, res) => {

  User.findOne({ 'email': req.body.email })
    .then((result) => {
      if (result != null) {

        if (result.password == req.body.password) {

          let token = jwt.sign({ 'result': result._id }, process.env.TOKEN_KEY)
          res.json({ 'token': token, state: 'Connected' })
        }
        else {
          res.json({ errMsg: 'Password Incorrect', state: 'error' })
        }
      }
      else {
        res.json({ errMsg: 'User Not Found', state: 'error' })
      }
    }).catch((err) => {
      console.log(err)
    })
}

const authorization = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      console.log(err)
    }
    else {
      req.user = user;

    }
    next();
  })


}

const getProfile = (req, res) => {
  User.findById(ObjectId(req.user.result))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
}


const getUserById = (req, res) => {
  User.findById(ObjectId(req.query.id))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
}




var storage = multer.diskStorage({
  destination: '../ecommerceApp/src/assets/uploads/profile',
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })



const updateProfileImg = (req, res) => {

  let filename = req.body.img;
  console.log(filename)
  let extension = path.extname(filename);

  let file = path.basename(filename, extension) + extension;
  User.updateOne({ _id: req.user.result }, { $set: { img: file } })
    .then((result) => {
      res.send({ message: 'updated Succesflly' })
    })
    .catch((err) => {
      console.log(err)
    })
}
module.exports = {
  addUser,
  login,
  authorization,
  getProfile,
  getUserById,
  upload,
  updateProfileImg

}