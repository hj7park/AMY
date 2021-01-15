var express = require('express');
var router = express.Router();
const questionCtrl = require('../controllers/questions');



router.get('/', questionCtrl.index);

router.post('/new',isLoggedIn, questionCtrl.addQuestion);
router.post('/:id/answers/:aid/ratings', isLoggedIn, questionCtrl.addRating)
router.post('/:id/edit', isLoggedIn, questionCtrl.updateQuestion)
router.post('/:id/editForm', isLoggedIn, questionCtrl.updateQuestionForm)
router.post('/:id/delete', isLoggedIn, questionCtrl.deleteQuestion)

router.get('/:id', questionCtrl.showQuestion);
router.post('/:id/answers/new',isLoggedIn, questionCtrl.addAnswer);
router.post('/:id', questionCtrl.deleteAdminQuestion);


//logged in middleware
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
