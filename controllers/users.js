const Question = require('../models/questions');
const User = require('../models/users');

function index(req, res, next) {
    if(req.isAuthenticated())
    {
        res.render('index', {
            user: req.user,
            name: req.user.name
        });
    }
    else{
        res.render('index', {
            user: req.user,
            name: req.query.name
        });
    }
}

async function findQuestions(req,res,next){
    let questions = await Question.find({username: req.user._id});
    questions.sort((a,b) => b.popularity - a.popularity);
    res.render("userPage.ejs",{questions,user:req.user});
}

module.exports = {
    index,
    findQuestions
};