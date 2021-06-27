const {validationResult} = require('express-validator/check');
const Post = require('../models/post');
exports.getPosts = (req,res,next)=>{
    Post.find()
    .then(posts =>{
        res.status(200).json({message:'Fetched posts successfuly', posts:posts });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next (err);
    });
};

exports.postPosts = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    if(!req.file){
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
    title :title,
    content:content,
    imageUrl : imageUrl,
    creator :{
        name:'Sara'
    }
   });
   post.save()
   .then(result =>{
       console.log(result);
       res.status(201).json({
        message:"post created",
        post:result
    });
   })
   .catch(err => {
       if(!err.statusCode){
           err.statusCode = 500;
       }
       next (err);
   });
};

exports.getPost = (req,res,next) =>{
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post =>{
        if(!post){
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Fetched a post successfuly' , post:post})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next (err);
    });
 };