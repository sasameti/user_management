var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('/Users/sajad/WebstormProjects/updated_html_form/views/User_views/index.hbs', { title: 'Main Page' });
});
router.post('/reg',function (req,res) {
  res.redirect('./register')


});
router.post('/log',function (req,res) {
  res.redirect('./login')


});
module.exports = router;
