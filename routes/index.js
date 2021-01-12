var express = require('express');
var router = express.Router();
const passport = require('passport');
const userCtrl = require('../controllers/users');

/* GET home page. */
router.get('/', userCtrl.index);

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/questions',
    failureRedirect: '/'
  }
));


router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
