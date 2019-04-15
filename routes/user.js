/**
 * Created by sajad on 10/18/16.
 */
var express = require('express');
var router = express.Router();

var USer_Data = require('../models/User_model');

module.exports = function () {


  router.get('/',function (req,res) {

          console.log("sajjjjjjjjjaaaaad"+req.user);
          res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/profile.hbs', {in: req.user});


  });

    router.post('/submitchanges/:id',function (req,res) {
            console.log("about to change:");

                   if (req.body.firstname != null) {

                       req.user.firstname = req.body.firstname;
                   };


                   if (req.body.description != null) {

                       console.log(req.body.description);
                       req.user.Description = req.body.description;
                   };


                   if (req.body.email != null) {

                       req.user.email = req.body.email;
                   };

                   if (req.body.lastname != null) {

                       req.user.lastname = req.body.lastname;
                   };
                   req.user.save();
                   res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/profile.hbs', {in: req.user});



    });






    return router
};