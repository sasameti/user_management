/**
 * Created by sajad on 10/13/16.
 */
var express = require('express');
var router = express.Router();

var USer_Data = require('../models/User_model');
module.exports = function (passport) {


    router.get('/', function (req, res, next) {

        USer_Data.find(function (err, doc) {
            if (err) {
                console.error('Sajad Sucks')
            }
            console.log(doc);
            res.render('../views/Admin/Management.hbs', {title: 'Management Page', in: doc});
        });

    });
    router.get('/my-profile', function (req, res) {

        res.render('../views/User_views/profile.hbs', {title: 'My profile',in: req.user});
    });
    router.get('/new-role', function (req, res, next) {

        res.render('../views/Admin/new-role.hbs', {title: 'Management Page'});
    });
    router.get('/new-user', function (req, res, next) {

        res.render('../views/Admin/new-user.hbs', {title: 'Management Page'});
    });
    router.get('/roles', function (req, res, next) {

        res.render('../views/Admin/roles.hbs', {title: 'Management Page'});
    });
    router.get('/stats', function (req, res, next) {

        res.render('../views/Admin/stats.hbs', {title: 'Management Page'});
    });
    router.get('/user-stats', function (req, res, next) {

        res.render('../views/Admin/user-stats.hbs', {title: 'Management Page'});
    });
    router.get('/users', function (req, res, next) {

        res.render('../views/Admin/users.hbs', {title: 'Management Page'});
    });
    router.post('/changeaccess/:id',function (req,res) {
        USer_Data.findOne({'id' : req.params.id},function (err,found) {
            console.log(found.id);
           if (err){
               return err
           }
           else {
               console.log(found.Access);
               console.log("body value is:"+req.body.change_access);
                console.log("initial Access value is:"+found.Access);
               found.Access = req.body.change_access;
               console.log("final Access value is:"+found.Access);

               USer_Data.find(function (err, doc) {
                   if (err) {
                       console.error('Sajad Sucks')
                   }
                   found.save();
                   console.log(doc);
                   res.render('../views/Admin/Management.hbs', {title: 'Management Page', in: doc});
               });
           };

        });

    });

    return router;
};