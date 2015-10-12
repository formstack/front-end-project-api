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
    fixtures[key].type = 'folder';
  }

  for (key in files) {
    if (!files.hasOwnProperty(key)) {
      continue;
    }

    fixtures[key] = files[key];
    fixtures[key].type = 'file';
  }

  // REST API ROUTING
  // ----------------

  // ls
  router.route('/ls/:id')

  .get(function(req, res) {
    if (!fixtures[req.params.id]) {
      res.status(404).send('That item was not found.');

      return;
    }

    var currentFixture = fixtures[req.params.id];

    // if the item is a folder, return the contents
    if (currentFixture.type === 'folder') {
      var responseItems = {};

      for (key in fixtures) {
        if (!fixtures.hasOwnProperty(key)) {
          continue;
        }

        if (fixtures[key].parent === req.params.id) {
          responseItems[key] = fixtures[key];
        }
      }

      res.json({ items: responseItems });
    }

    // if the item is a fole, return the filename
    if (currentFixture.type === 'file') {
      res.json({ items: currentFixture.name + '.' + currentFixture.extension });
    }
  });

  // cat
  router.route('/cat/:id')

  .get(function(req, res) {
    if (!fixtures[req.params.id]) {
      res.status(404).send('That item was not found.');

      return;
    }

    res.json({ content: fixtures[req.params.id].content });
  });

  // autocomplete
  router.route('/autocomplete/:text')

  .get(function(req, res) {
    if (!req.params.text) {
      res.status(400).send('You must supply a search string.');

      return;
    }

    res.json({ results: req.params.text });
  });

  // -----------
  // END ROUTING

  server.use('/api', router);
  server.listen(8080);

  console.log('FS Front-End Applicant Project server running on 8080');
})();
