var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User_model');
var bCrypt = require('bcrypt-nodejs');
var randomstring = require('randomstring');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
	        usernameField: 'email',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            req.checkBody('email','Invalid Email').notEmpty().isEmail();
            req.checkBody('password','Invalid Password').notEmpty().isLength({min:8});
            req.checkBody('username','Username should be entered').notEmpty();
            var errors = req.validationErrors();
            if(errors){
                var messages= [];
                errors.forEach(function (error) {
                    messages.push(error.msg);

                });
                return done(null,false,req.flash('error',messages));
            }
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+req.body.username);
                        return done(null, false, {message:'Email is already in use.'});
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = req.body.username;
                        newUser.password = createHash(password);
                        newUser.email = email;
                        newUser.firstName = req.param('firstname');
                        newUser.lastName = req.param('lastname');
                        newUser.Access = 'user';
                        newUser.Description = 'No description written yet';
                        newUser.Verified = '0';
                        newUser.Key = Math.random();


                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

};