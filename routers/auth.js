const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/keys")
const requestlogin = require("../middleware/requestlogin");

router.get('/protected',requestlogin,(req,res)=>{
    res.send("hello form protected");
});

// router.get('/',(req,res)=>{
//     res.send("hello this is route");
// });

router.post("/signup", (req, res) => {
//   console.log(req.body.name);
    const {name,email,password,pic} = req.body;
    if (!email || !name || !password){
        return res.status(422).json({error:"please fill all fields"});
}
// res.json({message:"sucessfully posted"});
User.findOne({email:email})
.then((savedUser) =>{
    if (savedUser){
        return res.status(422).json({ error: "User already exists" });
    }
    // password hashing
    bcrypt.hash(password,12)
    .then(hashpass=>{

        const user = new User({
          email,
          password:hashpass,
          name,
          pic
        });
        user.save()
          .then((user) => {
            res.json({ message: "saved success" });
          })
          .catch((err) => {
            console.log(err);
          });

    })
    

})
    .catch(err=>{
        console.log(err);

    })
});


router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"});
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({ error: "invalid email! please singup first" });
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.status(422).json({ message: "signup successfully" });
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {
                  _id,
                  name,
                  email,
                  followers,
                  following,
                  pic,
                } = savedUser;
                res.json({
                  token: token,
                  user: { _id, name, email ,followers ,following,pic },
                });

            }else{
            return res.status(422) .json({ error: "invalid email or password!" });

            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports = router;