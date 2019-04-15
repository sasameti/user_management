var express = require('express');
var router = express.Router();
var USer_Data = require('../models/User_model');

module.exports = function(passport) {

    router.get('/', function (req, res) {

        res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/Register.hbs', {title: 'Regiter page'});
    });
    return router;
};
