const {validationResult} = require('express-validator/check');
const Post = require('../models/post');
exports.getPosts = (req,res,next)=>{
    res.status(200).json({
        posts: [{
        _id: '1',
        title : "First Post",
        content: "This is the first post!",
        imageUrl:'images/dummy.jpg',
        creator :{
            name:'Sara'
        },
        createdAt: new Date()
    }]
    });
};

exports.postPosts = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed,entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
   const post = new Post({
    title :title,
    content:content,
    imageUrl : 'images/dummy.jpg',
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