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
        return res.status(422).json({ 
            message: 'Validation failed,entered data is incorrect',
            errors: errors.array()
    })
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
   .catch(err => console.log(err));
};