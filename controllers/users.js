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

module.exports = {
    index
};