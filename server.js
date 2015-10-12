(function() {
  'use strict';

  var express    = require('express'),
      bodyParser = require('body-parser'),
      cors       = require('cors');

  var server = express(),
      router = express.Router();

  server.use(bodyParser.json());
  server.use(cors());

  // let's display the readme
  server.get('/', function(req, res) {
    res.send('Main page.');
  });

  // REST API ROUTING
  // ----------------

  // ls
  router.route('/ls')

  .get(function(req, res) {
    res.json({ message: 'test all' });
  });

  router.route('/ls/:id')

  .get(function(req, res) {
    res.json({ message: 'id: ' + req.params.id });
  });

  // cat
  router.route('/cat')

  .get(function(req, res) {
    res.json({ message: 'test all' });
  });

  router.route('/cat/:id')

  .get(function(req, res) {
    res.json({ message: 'id: ' + req.params.id });
  });

  // autocomplete
  router.route('/autocomplete/:text')

  .get(function(req, res) {
    res.json({ message: 'id: ' + req.params.text });
  });

  // -----------
  // END ROUTING

  server.use('/api', router);
  server.listen(8080);

  console.log('FS Front-End Applicant Project server running on 8080');
})();
