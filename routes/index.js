var express = require('express');
var ContactModel = require('./../model/contact')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Read page. */
router.get('/read', function (req, res, next) {
  ContactModel.find({}, function (err, data) {
    res.render('read', { title: 'Read page', data });
  });
});

/* GET Delete page. */
router.get('/delete/:id', function (req, res, next) {
  let id = req.params.id
  ContactModel.findByIdAndRemove(id).exec()
  res.redirect('/read')
});

/* GET Edit page. */
router.get('/edit/:id', function (req, res, next) {
  let id = req.params.id;
  ContactModel.findById({ _id: id }, function (err, data) {
    res.render('edit', { title: "Edit page", data })
  });
});

/* POST Edit page. */
router.post('/edit/:id', function (req, res, next) {
  let { name, age } = req.body;
  let data = {
    name,
    age
  }
  ContactModel.update(data, function (err, data) {
    res.redirect('/read')
  });
});

/* GET Add page. */
router.get('/add', function (req, res, next) {
  res.render('add', { title: "Add page"})  
});

/* POST Add page. */
router.post('/add', function (req, res, next) {
  let item = {
    name : req.body.name,
    age : req.body.age
  }
  let data = new ContactModel(item)
  data.save();
  res.redirect('/read')
});



module.exports = router;
