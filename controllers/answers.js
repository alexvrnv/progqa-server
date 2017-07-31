var Questions = require('../models/questions');
var Users = require('../models/users');

exports.post = function (req, res) {
    Questions.findById(req.body.question_id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var answer = {
            user_id: req.body.user_id,
            correct: false,
            description: req.body.description,
            date_created: Date.now()
        };
        doc.answers.push(answer);
        Questions.update(req.body.question_id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    });
    Users.findById(req.body.user_id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var answer = {
            question_id: req.body.question_id,
            correct: false,
            description: req.body.description,
            date_created: Date.now()
        };
        doc.answers.push(answer);
        Users.update(req.body.user_id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};

exports.delete = function(req, res) {
    Questions.findById(req.body.question_id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var users = doc.answers.map(function(v){
            return v.user_id;
        });
        doc.answers.splice(users.indexOf(req.body.user_id), 1);
        Questions.update(doc._id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    });
    Users.findById(req.body.user_id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var questions = doc.answers.map(function(v){
            return v.question_id;
        });
        doc.answers.splice(questions.indexOf(req.body.question_id), 1);
        Users.update(doc._id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};

exports.put = function (req, res) {
    Questions.findById(req.body.question_id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var users = doc.answers.map(function(v){
            return v.user_id;
        });
        doc.answers[users.indexOf(req.body.user_id)].description = req.body.description;
        Questions.update(req.body.question_id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        });
    });
    Users.findById(req.body.user_id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var questions = doc.answers.map(function(v){
            return v.question_id;
        });
        doc.answers[questions.indexOf(req.body.question_id)].description = req.body.description;
        Users.update(req.body.user_id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};




