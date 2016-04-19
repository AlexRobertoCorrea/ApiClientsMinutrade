/**
 * Created by alex on 19/04/16.
 */
var globo = require('../../../server.js');

require('./bootstrap.js');

// Helpers Tests
require('./steps/helpers_spec.js')(globo.app);

// Clients Tests
require('./steps/clients_spec.js')(globo.app);