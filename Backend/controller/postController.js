const Post = require('../models/post');
const ObjectId = require('mongodb').ObjectID;
const path = require('path');

const multer = require('multer');


var storage = multer.diskStorage({
  destination: '../ecommerceApp/src/assets/uploads',
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })




const addPost = (req, res) => {

  let filename = req.body.post.file;
  let extension = path.extname(filename);

  let file = path.basename(filename, extension) + extension;

  let post = new Post(
    {
      user: req.user.result,
      title: req.body.post.title,
      file: file,
      desc: req.body.post.desc
    });
  post.save()
    .then((result) => {
      res.send({ message: 'added Succesflly' })
    })
    .catch((err) => {
      console.log(err)
    })
}

const getAllPosts = (req, res) => {

  const page = req.params.page;
  const limit = req.params.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  Post.find()
    .then((result) => {
      res.json({ page: result.slice(startIndex, endIndex).reverse(), len: Math.ceil((result.length) / limit) })
    })
    .catch((err) => {
      res.send(err)
    })
}


const getPost = (req, res) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  Post.find({ user: ObjectId(req.user.result) })
    .then((result) => {

      res.json({ page: result.slice(startIndex, endIndex), len: Math.ceil((result.length) / limit) })

    })
    .catch((err) => {
      console.log(err)
    })
}

const getPostDetails = (req, res) => {
  Post.findById(ObjectId(req.query.post_id))
    .then((result) => {
    })
    .catch((err) => {
      console.log(err)
    })
}

const getPostByUserId = (req, res) => {

  Post.find({ user: ObjectId(req.query.user_id) })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err);
    })
}

const getPostById = (req, res) => {
  Post.findById(ObjectId(req.query.id))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
}



module.exports = {
  addPost,
  upload,
  getAllPosts,
  getPost,
  getPostDetails,
  getPostByUserId,
  getPostById
}
