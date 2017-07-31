var jwt = require('jsonwebtoken');
var Users = require('../models/users');
var Hash = require('password-hash');

exports.authenticate = function (req, res) {
    Users.findByMail(req.body.email, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (Hash.verify(req.body.password, doc.pass_hash)) {
            var token = jwt.sign(doc, process.env.SECRET_KEY, {
                expiresIn: '7d'
            });
            res.json({
                user: doc,
                token: token
            });
        }
        else {
            return res.sendStatus(500);
        }
    });

}