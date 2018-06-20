var User       = require('../app/models/user');
var Friend       = require('../app/models/friend');
async = require("async");
var path = require('path'),
    fs = require('fs');
module.exports = function(app, passport,server) {
	app.get('/', function(request, response) {
		response.render('index.html');
	});
	app.get('/Add', auth, function(request, response) {
		response.render('Add.html', {
			user : request.user
		});
	});


	app.get('/Update', auth, function(request, response) {
		response.render('Update.html', {
			user : request.user
		});
	});
	app.get('/Delete', auth, function(request, response) {
		response.render('Delete.html', {
			user : request.user
		});
	app.get('/roi', auth, function(request, response) {
		response.render('Campaign ROI Analysis.html', {
			user : request.user
		});

	});
	app.get('/Member', auth, function(request, response) {
		response.render('Campaign Member Status.html', {
			user : request.user
		});

	});
	app.get('/Management', auth, function(request, response) {
		response.render('Campaign Management.html', {
			user : request.user
		});

	});
	app.get('/logout', function(request, response) {
		request.logout();
		response.redirect('/');
	});

		app.get('/login', function(request, response) {
			response.render('login.html', { message: request.flash('error') });
		});

		app.post('/login', passport.authenticate('login', {
			successRedirect : '/Add', 
			failureRedirect : '/login', 
			failureFlash : true
		}));

		
		app.get('/Update', function(request, response) {
			response.render('Update.html', { message: request.flash('updateerror') });
		});


		app.post('/friend',  function (request, response){
				Friend.findOne({ $and: [ {'friend.mainfriendid': request.param('mainfriendid')}, { 'friend.anotherfriendid': request.param('anotherfriendid') } ] }, function(err, friend) {
            	    		if (err){ return done(err);}
                    		if (friend) {
				response.redirect('/login');

                    		} else {
				if(request.param('anotherfriendid') != ''){
				var newFriend            = new Friend();
 			 	newFriend.friend.mainfriendid = request.param('mainfriendid');
				newFriend.friend.anotherfriendid = request.param('anotherfriendid');
	 			newFriend.save();
				}
				response.redirect('/login');
				}
 				});
  		});



var io = require('socket.io').listen(server);

var usernames = {};

io.sockets.on('connection', function (socket) {

  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    io.sockets.emit('updateusers', usernames);
  });

  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});

};
function auth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
