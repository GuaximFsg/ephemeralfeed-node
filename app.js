var fs = require('fs'); 
const standarduser = {"userlist":{"Andre":{"password":"12345"}}};
const standardpost = {"postlist": { "abcdefg" : {"username":"JohnDoe","message":"Hello, World!"}}}

//start the databases
fs.writeFile("controllers/userdatabase.json", JSON.stringify(standarduser), function(err, result) {
  if(err) console.log('error', err);
});
fs.writeFile("controllers/postdatabase.json", JSON.stringify(standardpost), function(err, result) {
  if(err) console.log('error in postdatabase', err);
});

const express = require('express');
const app = express();

// This makes so we can serve files and images without specifying get functions for all of them
// example.com/images/*, for example. Also avoids ../ attacks and 404's when files are not found
//app.use(express.static('public'));

const usersRouter = require("./routes/users.js");



const myLogger = function(req, res, next) {
  console.log("\n\nRequest IP: " + req.ip);
  console.log("Request Method: " + req.method);
  console.log("Request date: " + new Date());
  console.log("Urls: " + req.path)
  
  next(); // THIS IS IMPORTANT!
}



// parse JSON requests with express.json() middleware
app.use(express.json());
app.use('/', myLogger);

// usersRouter will deal with any request in /users
app.use("/users", usersRouter);

app.all('/', (req, res) => {
  //res.sendFile(__dirname + '/public/index.html');
  //console.log(req.query);
  res.send("<p>Those are the currently availabe requests:</p>\n<ul><li>put on /users</li><li>get on /users</li>");

});

// app.METHOD functions (include get, post, etc)



app.listen(3000, () => {
  console.log('Server started on port 3000');
});