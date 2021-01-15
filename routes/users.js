var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', isLoggedIn,userCtrl.findQuestions);


//logged in middleware
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
