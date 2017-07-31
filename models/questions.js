var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(cb) {
    return db.get().collection('questions').find().toArray(function(err, docs) {
       return cb(err, docs);
    });
};

exports.findById = function(id, cb) {
    db.get().collection('questions').findOne({_id: ObjectID(id)}, function(err, doc) {
        cb(err, doc);
    });
};

exports.create = function(question, cb) {
    db.get().collection('questions').insertOne(question, function(err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('questions').updateOne({_id: ObjectID(id)}, newData, function(err, result) {
        cb(err, result);
    });
};


exports.delete = function(id, cb) {
    db.get().collection('questions').deleteOne({_id: ObjectID(id)}, function (err, result) {
        cb(err, result);
    });
};

exports.vote = function (id, newData, cb) {
    db.get().collection('questions').updateOne({_id: ObjectID(id)}, newData, function(err, result) {
        cb(err, result);
    });
}

exports.view = function (id, newData, cb) {
    db.get().collection('questions').updateOne({_id: ObjectID(id)}, newData, function(err, result) {
        cb(err, result);
    });
}

exports.close = function (id, newData, cb) {
    db.get().collection('questions').updateOne({_id: ObjectID(id)}, newData, function(err, result) {
        cb(err, result);
    });
}