/**
 * Created by sajad on 10/13/16.
 */
var express = require('express');
var router = express.Router();
var USer_Data = require('../models/User_model');
module.exports = function (passport)


{

    router.get('/', function (req, res) {

        console.log("in /");
        res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/login.hbs', {title: 'Login Page'});

    });


    router.post('/submit', function (req, res) {
        console.log('in post function');
        var in_name = req.body.user;
        USer_Data.findOne({Name: in_name}, function (err, doc) {
            console.log(doc);
            if (err) {
                console.error("No Such Entry")
            }
            if (doc == null) {
                console.error("No DATA");
                res.redirect('/register');
            }
            else {

            if (doc.Password == req.body.password) {
                console.log("Login successful");
            }
            else {
                console.log("Wrong password")
            }
            if (doc.Access == '1') {
                res.redirect('/Management')
            }
            if (doc.Access == '2') {
                res.redirect('/Register')
            }
        }

        });

    });
    return router;
};




