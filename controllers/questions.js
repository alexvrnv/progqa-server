var Questions = require('../models/questions');

exports.all = function(req, res) {
    Questions.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};

exports.findById = function (req, res) {
    Questions.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
             return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.create = function (req, res) {
    console.log(req.body);
    var question = {
        question_header: req.body.question.question_header,
        description: req.body.question.description,
        user_id: req.body.question.user_id,
        date_created: Date.now(),
        votes: [],
        views: [],
        closed: false,
        answers: []
    };
    console.log(question);
    Questions.create(question, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    });
};

exports.update = function (req, res) {
    Questions.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.question_header = req.body.question_header;
        doc.description = req.body.description;
        Questions.update(req.params.id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });

};

exports.delete = function (req, res) {
    Questions.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

exports.vote = function (req, res) {
    Questions.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.votes.push(req.body.user_id);
        console.log(doc);
        Questions.update(req.params.id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};

exports.view = function (req, res) {
    Questions.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.views.push(req.body.user_id);
        console.log(doc);
        Questions.update(req.params.id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};

exports.close = function (req, res) {
    Questions.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.closed = true;
        console.log(doc);
        Questions.update(req.params.id, doc, function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });
};
