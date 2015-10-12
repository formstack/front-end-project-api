(function() {
  'use strict';

  var express    = require('express'),
      bodyParser = require('body-parser'),
      cors       = require('cors');

  var server = express();

  server.use(bodyParser.json());
  server.use(cors());

  server.listen(8080);
})();
