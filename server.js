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

  var folders  = require('./fixtures/folders.json'),
      files    = require('./fixtures/files.json'),
      key      = '',
      fixtures = {};

  for (key in folders) {
    if (!folders.hasOwnProperty(key)) {
      continue;
    }

    fixtures[key] = folders[key];
  }

  for (key in files) {
    if (!files.hasOwnProperty(key)) {
      continue;
    }

    fixtures[key] = files[key];
  }

  // REST API ROUTING
  // ----------------

  // ls
  router.route('/ls/:id')

  .get(function(req, res) {
    res.json({ item: fixtures[req.params.id] });
  });

  // cat
  router.route('/cat/:id')

  .get(function(req, res) {
    res.json({ content: fixtures[req.params.id].content });
  });

  // autocomplete
  router.route('/autocomplete/:text')

  .get(function(req, res) {
    res.json({ results: 'id: ' + req.params.text });
  });

  // -----------
  // END ROUTING

  server.use('/api', router);
  server.listen(8080);

  console.log('FS Front-End Applicant Project server running on 8080');
})();
