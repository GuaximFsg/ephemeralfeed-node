//controllers separate the functions that route requests from 
// the functions that actually deal with them. They might also
// create html pages with that will contain the infos 
// TODO URGENT: create global var containing the feed with the postdatabase contents to avoid constant read

var fs = require('fs');       // import native module to r/w files
var crypto = require('crypto');
const User = require("../model/user.js");   // user class (type) defined in model

function addpost(user)
{
  var obj = {
    postlist: {}
  };
  var hash = crypto.createHash('md5').update(user.message).digest('hex');
  
  fs.readFile('postdatabase.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log("error in controllerpost: " + err);
    } else {
      obj = JSON.parse(data); // now it's an object
      if (!obj.postlist) {
        obj.postlist = {}; // initialize postlist if it's undefined
      }
      obj.postlist[hash] = {"username": user.username,"message": user.message}; // add some data
      json = JSON.stringify(obj); // convert it back to JSON
      fs.writeFile('postdatabase.json', json, 'utf8', function callback(err) {
        if (err) {
          console.log('error', err);
        }
      }); // write it back
    }
  })
}


module.exports = class UserController {
  post(userProps) {
    const user = new User(userProps);
    addpost(user);
    return "<p>" + user.username + ":</p><p>" + user.message + "</p>";
  }
  
  feed() {
    var feedcontent = {};
    fs.readFile('postdatabase.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log("error in controller get: " + err);
      } else {
        feedcontent = JSON.parse(data); // now it's an object
        return ;
      }
    })
  }

};