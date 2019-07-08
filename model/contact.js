var mongoose = require('mongoose');
var contact = new mongoose.Schema({ name: 'string', age: 'number' }, {collection:"contact"});

module.exports = mongoose.model('contact', contact);