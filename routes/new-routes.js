/**
 * Created by sajad on 10/17/16.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User_model');
//configuring mailer
var nodemailer = require("nodemailer");
var sleep = require('sleep');
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sasameti@gmail.com",
        pass: "sajjad1372sameti"
    }
});
//end of mailer config
var isAuthenticated = function (req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};

module.exports = function(passport) {

    var Management = require('../routes/Managment');
    router.use('/Managment', Management(passport));

    var users = require('../routes/user');



    router.get('/', function (req, res) {

        res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/index.hbs', {message: req.flash('message')});
    });
    router.post('/login',passport.authenticate('login',{
        successRedirect:'/logger',
        failureRedirect:'/login',
        failureFlash:true
    }));
    router.get('/logger',function (req,res) {
        if (req.user.Verified == '1' || req.user.Access == 'admin' ) {
            if (req.user.Access == 'admin') {
                console.log('admin is here');
                res.redirect('/Managment');
            }
            else {
                router.use('/user', users(req.user));
                res.redirect('/user');
            }
        }
        else
        {
            res.redirect('/verification');
        }
    });

  /*  router.post('/login',passport.authenticate('login'),function (req,res) {
        console.log('Heeeeelooooo sanjooli');
        console.log('The authenticated user is:############'+req.user);
        if (req.user.Verified == '1' || req.user.Access == 'admin' ) {
            if (req.user.Access == 'admin') {
                console.log('admin is here');
                res.redirect('/Managment');
            }
            else {
                router.use('/user', users(req.user));
                res.redirect('/user');
            }
        }
        else
        {
            res.redirect('/verification');
        }
    });*/


    router.get('/login', function (req, res) {
        var messages = req.flash('error');
        res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/login.hbs', {messages: messages,hasErrors:messages.length >0})


    });

    router.get('/Register', function (req, res) {
        var messages = req.flash('error');

        res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/Register.hbs', {messages: messages,hasErrors:messages.length >0});
    });

    router.post('/signup',passport.authenticate('signup',{
        successRedirect:'/mailer',
        failureRedirect:'/Register',
        failureFlash: true
    }));

router.get('/mailer',function (req,res) {

    var mailOptions = {
        to: req.user.email,
        subject: "Account Verification Email",
        text: "Please go to 127.0.0.1:3000/verification ?username="+req.user.username+' to activate your account or 127.0.0.1:3000/verification and enter your user name '+req.user.username+"  and  " + req.user.Key + "   to activate your account"
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("an error occured Please try again later");
        } else {
            console.log("Message sent: " + response.message);
            req.logout();
            res.redirect("/verification");
        }
    });


});



   /*router.post('/signup',passport.authenticate('signup'),function (req,res) {

        var mailOptions = {
            to: req.user.email,
            subject: "Account Verification Email",
            text: "Please go to 127.0.0.1:3000/verification and enter your user name"+req.user.username+" and  " + req.user.Key + "   to activate your account"
        };

        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("an error occured Please try again later");
            } else {
                console.log("Message sent: " + response.message);
                req.logout();
                res.redirect("/verification");
            }
        });


        }

    );*/

    router.get('/Management', isAuthenticated, function (req, res) {
        if (req.user.Access == 'admin') {
            res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/Management.hbs', {user: req.user});
        }
        else {
            res.redirect('/');
        }
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/edit/:id', isAuthenticated, function (req, res) {

            console.log("sanjoooooolo"+req.user);
            router.use('/user', users);
            res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/edit.hbs', {in: req.user});


    });

    router.get('/logout', function(req, res){
        console.log('logging out');
        req.logout();
        res.redirect('/');
    });


    router.get('/verification\*',function (req,res) {
        console.log(req.query.username);
        User.findOne({'username':req.query.username},function (err,user) {
           if(user){
              user.Verified = '1';
               user.save();
               res.redirect('/login');
           }
           else{
               res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/verification.hbs',{message:"please verify your account",title:'verification page'})
           }
        });


    });
    router.post('/verification',function (req,res) {

        User.findOne({'username': req.body.username},function (err,user) {
            if (err){
                res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/verification.hbs',{message:"An error accured please try again"})
            }
            else if (user == null){
                res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/verification.hbs',{message:"This username is not registered"})
            }
            else{

                 if (req.body.verificationkey == user.Key) {
                    user.Verified = '1';
                    user.save();
                    res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/verification.hbs', {message: "Your account has been verified you may now log in using your username and password"})
                    sleep.usleep(5000);
                }
                else{
                    res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/verification.hbs',{message:"Your key is not valid"})
                }
            }
        })
    });
    return router;


};



