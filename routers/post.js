const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requestlogin = require("../middleware/requestlogin");
const Post = mongoose.model("Post");

// all posts
router.get("/allpost", requestlogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    // .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

// my followinf posts
router.get("/getsubpost", requestlogin, (req, res) => {
  Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    // .sort("-createdAt")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

// posts by logged in user
router.get("/mypost", requestlogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("PostedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

//create post by logged in user
router.post("/createpost", requestlogin, (req, res) => {
  const { title, body ,pic} = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  console.log(req.user)
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo:pic,
    postedBy: req.user,
  });
  post.save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/like",requestlogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
  },{
    new:true,
  }).exec((err,result) =>{
    if(err){
      res.status(422).json({error:err});
    }else{
      res.json(result);
    }
  })
});

router.put("/unlike", requestlogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: req.user._id }
  }, {
    new: true,
  }).exec((err, result) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  })
});

router.put("/comment", requestlogin, (req, res) => {

  const comment ={
    text:req.body.text,
    postedBy : req.user._id
  }

  Post.findByIdAndUpdate(req.body.postId, {
    $push: { comments: comment }
  }, {
    new: true,
  }).populate("comments.postedBy","_id name")
  .populate("postedBy","_id name")
  .exec((err, result) => {
    if (err) {
      res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  })
});

router.delete('/deletepost/:postId',requestlogin,(req,res)=>{
  Post.findOne({_id:req.params.postId})
  .populate("postedBy","_id")
  .exec((err,post)=>{
    if(err || !post){
      return res.status(422).json({error:err})
    }
    if(post.postedBy._id.toString() === req.user._id.toString()){
      post.remove()
      .then(result=>{
        res.json(result);
      }).catch(err=>{
        console.log(err);
      })
    }
  })
})

module.exports = router;