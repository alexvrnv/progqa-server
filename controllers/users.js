var Users = require('../models/users');
var Hash = require('password-hash');

exports.all = function(req, res) {
    Users.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};

exports.findById = function (req, res) {
    Users.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.create = function (req, res) {
    var user = {
        email: req.body.email,
        display_name: req.body.display_name,
        pass_hash: Hash.generate(req.body.password),
        first_name: null,
        last_name: null,
        working_position: null,
        experience: 0,
        technologies: [],
        answers: []
    };
    Users.create(user, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    });
};

exports.update = function (req, res) {
    Users.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.display_name = req.body.display_name;
        doc.first_name = req.body.first_name;
        doc.last_name = req.body.last_name;
        doc.working_position = req.body.working_position;
        // doc.experience = req.body.user.experience;
        Users.update(req.params.id, doc, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    });

};

exports.delete = function (req, res) {
    Users.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

exports.userByMail = function (req, res) {
    Users.findByMail(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};