const Question = require('../models/questions');
let errorMessage;


async function index(req,res,next){
    let questions = await Question.find({});
    questions.sort((a,b) => b.popularity - a.popularity);
    res.render("questions.ejs", {questions,user:req.user});   
}

async function addQuestion(req,res,next){
    let createQuestion = await Question.create({question:req.body.question, username:req.user});
    res.redirect("/questions");   
}

async function showQuestion(req,res,next){
    errorMessage="";
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    question.popularity = question.popularity + 1;
    await question.save();
    res.render("selectedQuestion.ejs", {question, user:req.user,errorMessage});
}


async function addAnswer(req,res,next){
    errorMessage="";
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    /*if(question.answer.include(answer))
    {
    }*/
    question.answers.push({answer:req.body.answer, username:req.user});
    await question.save();
    res.render("selectedQuestion.ejs", {question, user:req.user,errorMessage});
}

async function deleteAdminQuestion(req,res,next){
    if(req.user.role =="admin"){
            await Question.remove({_id:req.params.id});
            res.redirect("/questions");
    }
    else{
        res.send("NOT AN ADMIN");
    }
}

async function addRating(req,res,next){
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    let answers = question.answers;
    let answerIndex = answers.findIndex(answer => answer._id == req.params.aid);
    let ratings = answers[answerIndex].ratings;
    if(ratings.some(rating => String(rating.username) == String(req.user._id)))
    {
        console.log("in here");
        errorMessage = "You already gave your ratings!";
    }
    else
    {
        ratings.push({rating:req.body.rating, username:req.user});
        await question.save();
    }
    res.render("selectedQuestion.ejs", {question,user:req.user, errorMessage});
    //res.redirect(`/questions/${req.params.id}`);
}

async function updateQuestion(req,res,next){
    let question = await Question.findById({_id:req.params.id});
    res.render("editQuestion.ejs", {question, user:req.user});
    //let question = await Question.updateOne({_id : req.params.id},{req.body});
}

async function updateQuestionForm(req,res,next){
    let question = await Question.updateOne({_id : req.params.id},{question:req.body.question});
    res.redirect(`/questions/${req.params.id}`);
}
async function deleteQuestion(req,res,next){
    await Question.remove({_id:req.params.id});
    res.redirect("/questions");
}

async function updateAnswer(req,res,next){
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    let answers = question.answers;
    let answerIndex = answers.findIndex(answer => answer._id == req.params.aid);
    let answer = answers[answerIndex];
    res.render("editAnswer.ejs", {answer,question, user:req.user});
    //let question = await Question.updateOne({_id : req.params.id},{req.body});
}
async function updateAnswerForm(req,res,next){
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    let answers = question.answers;
    let answerIndex = answers.findIndex(answer => answer._id == req.params.aid);
    answers[answerIndex].answer = req.body.answer;
    await question.save();
    res.redirect(`/questions/${req.params.id}`);
}
async function deleteAnswer(req,res,next){
    let question = await Question.findById(req.params.id).populate('username').populate('answers.username');
    let answers = question.answers;
    let answerIndex = answers.findIndex(answer => answer._id == req.params.aid);
    answers.splice(answerIndex,1);
    await question.save();
    res.redirect(`/questions/${req.params.id}`);
}



module.exports = {
    index,
    addQuestion,
    showQuestion,
    deleteAdminQuestion,
    addAnswer,
    addRating,
    deleteQuestion,
    updateQuestion,
    updateQuestionForm,
    deleteAnswer,
    updateAnswer,
    updateAnswerForm
};