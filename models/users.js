var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(cb) {
    return db.get().collection('users').find().toArray(function(err, docs) {
        return cb(err, docs);
    });
};

exports.findById = function(id, cb) {
    db.get().collection('users').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};

exports.create = function(question, cb) {
    db.get().collection('users').insertOne(question, function(err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('users').updateOne({_id: ObjectID(id)}, newData, function(err, result) {
        cb(err, result);
    });
};


exports.delete = function(id, cb) {
    db.get().collection('users').deleteOne({_id: ObjectID(id)}, function (err, result) {
        cb(err, result);
    });
};

exports.findByMail = function(mail, cb) {
    console.log(mail);
    db.get().collection('users').findOne({email: mail}, function(err, doc) {
        cb(err, doc);
    });
}