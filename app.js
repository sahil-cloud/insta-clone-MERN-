const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const {MONGOURI} = require('./config/keys');

const port = process.env.PORT  || 80;



// connection to db
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log("connected succesfully");
});

mongoose.connection.on("error", (err) => {
  console.log("connection failed",err);
});


require("./models/user");
require("./models/post");

app.use(express.json());

app.use(require("./routers/auth"));
app.use(require("./routers/post"));
app.use(require("./routers/user"));


// after deploying
if(process.env.NODE_ENV == "production"){
  app.use(express.static("projects/build"));
  const path = require('path');
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"projects","build","index.html"));
  })
}

// for serving static files
app.use('/static',express.static('static'));

// //set template engine as pug
// app.set('view engine', 'pug');

// //set the virews ditectory
// app.set('views',path.join(__dirname,'views'));

// // setting the endpoint for pug template
// app.get("/demo", (req, res) => {
//   res.status(200).render("demo", { title: "Hey", message: "Hello there!" });
// });

// middleware 
// const customMiddleware = (req,res,next) =>{
//     console.log("middle ware");
//     // res.send("hello dfghjk");
//     next();
// }

// app.use(customMiddleware);

app.get("/" ,(req,res) =>{
    console.log("middle ware ghjioiuytrftyui");

    res.send("hello");
});

app.get("/about", (req, res) => {
  res.send("hello about");
});

app.listen(port,() =>{
    console.log(`app started at port ${port}`);
});

