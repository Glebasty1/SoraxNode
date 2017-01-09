var express = require('express'),
	bodyParser = require('body-parser'),
    app = express(),
    server;


var store = {
	home: {
		page: 'Our super awsome app',
		content: 'Home sweet home'
	},
	about: {
		page: 'About page',
		content: 'Some content about our page'
	},
	dowloads: {
		page: 'Download page',
		content: 'Dowload all stuff here'
	},
	Profiles: {
		page: 'Profile Page',
		content: 'This is your profile'
	}
}

app.disable('x-powerded-by');

app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	next();
});

//static page hello.html
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/about', function(req, res){
	res.render('about.jade', {
		links: Object.keys(store)
	});
});

app.route('/new')
	.get(function(req, res){
		res.render('new.jade', {
			page: 'Add New',
			links: Object.keys(store)
		})
	})
	.post(function(req, res){
		var data = req.body;
		if (data.pageurl && data.pagename && data.pagecontent) {
			store[data.pageurl] = {
				page: data.pagename,
				content: data.pagecontent
			};
			storeKeys = Object.keys(store);
		}
			res.redirect('/');
		});


app.get('/:page?', function (req, res) {
  var page = req.params.page, data;
  if (!page) page = 'home';
  data = store[page];
  if (!data) {
  	res.redirect('/');
  	return;
  }
  data.links = Object.keys(store);
  res.render('main.jade', data);
});

server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});