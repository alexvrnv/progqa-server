var express = require('express')
    , cors = require('cors')
    , app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var jwt = require('jsonwebtoken');
var safeRoutes = express.Router();

var questionsController = require('./controllers/questions');
var usersController = require('./controllers/users');
var technologiesController = require('./controllers/technologies');
var answersController = require('./controllers/answers');
var authenticateController = require('./controllers/authenticate');

process.env.SECRET_KEY = "mykey";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/sf',safeRoutes);
app.use(cors());

app.use(function(req, res, next) {
    next();
});

safeRoutes.use(cors());
safeRoutes.use(bodyParser.json());
safeRoutes.use(bodyParser.urlencoded({extended: true}));
safeRoutes.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode) {
            if (err) {

                res.status(500).send("Invalid Token");
            } else {

                next();
            }
        })
    } else {
        res.status(500).send("No Token Provided");
    }
});


app.get('/', function(req, res) {
  res.send('Hello API')
});

app.post('/auth', authenticateController.authenticate);

app.get('/questions', questionsController.all);
app.get('/questions/:id', questionsController.findById);
safeRoutes.post('/questions', questionsController.create);
safeRoutes.put('/questions/:id', questionsController.update);
safeRoutes.delete('/questions/:id', questionsController.delete);
safeRoutes.put('/questionView/:id', questionsController.view);
safeRoutes.put('/questionVote/:id', questionsController.vote);
safeRoutes.put('/questionClose/:id', questionsController.close);

app.get('/userByMail/:id', usersController.userByMail);
app.get('/users', usersController.all);
app.get('/users/:id', usersController.findById);
app.post('/users', usersController.create);
safeRoutes.put('/users/:id', usersController.update);
safeRoutes.delete('/users/:id', usersController.delete);

app.get('/technologies', technologiesController.all);
app.get('/technologies/:id', technologiesController.findById);
safeRoutes.post('/technologies', technologiesController.create);
safeRoutes.put('/technologies/:id', technologiesController.update);
safeRoutes.delete('/technologies/:id', technologiesController.delete);

safeRoutes.post('/answers', answersController.post);
safeRoutes.delete('/answers', answersController.delete);
safeRoutes.put('/answers', answersController.put);


db.connect('mongodb://progqa:p3qsl62yazeto@ds129593.mlab.com:29593/progqa', function(err){
    if (err) {
        return console.log(err);
    }
    var port = process.env.PORT || 8000
    app.listen(port, function() {
        console.log('started')
    });
});


