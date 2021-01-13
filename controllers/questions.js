const Question = require('../models/questions');


async function index(req,res,next){
    let questions = await Question.find({});
    res.render("questions.ejs", {questions,user:req.user});   
}

async function addQuestion(req,res,next){
    let createQuestion = await Question.create({question:req.body.question, username:req.user});
    res.redirect("/questions");   
}

async function showQuestion(req,res,next){
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    question.popularity = question.popularity + 1;
    await question.save();
    //console.log("question",question);
    res.render("selectedQuestion.ejs", {question});
}


async function addAnswer(req,res,next){
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    /*if(question.answer.include(answer))
    {
    }*/
    question.answers.push({answer:req.body.answer, username:req.user});
    await question.save();
    res.render("selectedQuestion.ejs", {question});
}

async function deleteQuestion(req,res,next){
    if(req.user.role =="admin"){
        await Question.remove({_id:req.params.id});
        res.redirect("/questions");
    }
    else{
        res.send("NOT AN ADMIN");
    }
}

async function addRating(req,res,next){
    let question = await Question.findById(req.params.id).populate('username');
    let answers = question.answers;
    let answerIndex = answers.findIndex(answer => answer._id == req.params.aid);
    let ratings = answers[answerIndex].ratings;
    if(ratings.some(rating => String(rating.username) == String(req.user._id)))
    {
        
    }
    else
    {
        ratings.push({rating:req.body.rating, username:req.user});
        question.save();
    }
    //res.render("selectedQuestion.ejs", {question});
    res.redirect(`/questions/${req.params.id}`);
}




module.exports = {
    index,
    addQuestion,
    showQuestion,
    deleteQuestion,
    addAnswer,
    addRating
};