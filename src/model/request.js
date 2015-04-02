var mongoose = require('mongoose'),
		config = require('../../config.js');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', {name: String});

var kitty = new Cat({name: 'Zildjian'});
kitty.save(function (err) {
	if (err) // ...
		console.log('meow');
});
