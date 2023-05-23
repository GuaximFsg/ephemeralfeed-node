// routes will route the requests alongside useful info about them
// to the appropriate destinations
const express = require('express');
const router = express.Router();

const UserController = require("../controllers/users.js");
const controller = new UserController();






router.put("/", async (req, res) => {
  res.send("<p>posted</p>:" + controller.post(req.body.userProps))
});


router.post("/transference", async (req, res) => {
  res.json(
    controller.transference(
      req.body.donatorProps,
      req.body.recieverProps,
      req.body.tranferValue
    )
  );
});

//This file is mounted when requests for /users arrive, all the paths here are relative to users.
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('the request must be a put with the json {"userProps":{"username":"Banana","email":"pineapple@example.com","message":"Apple!","password":"Cucumber"}}\n</p><p>Password and email are not used yet</p<');
});

router.get('/feed', function(req, res) {
  const feedcontent = controller.feed()
  res.send(feedcontent + " oi");
});

// The first route that matches an incoming url will be used. If route 
// paths (create) and params (stockid) coexist, the paths must come first
router.get('/stocks/:stockid', function(req, res, next) {
  res.send('stockid: ' + req.params.stockid);
});


module.exports = router;
