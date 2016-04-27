/**
 * Created by alex on 19/04/16.
 */
var apiclientsminutrade = require('../../../server.js');

require('./bootstrap.js');

// Helpers Tests
require('./steps/helpers_spec.js')(apiclientsminutrade.app);

// Crypter Tests
require('./steps/crypter_spec.js')(apiclientsminutrade.app);

// Clients Tests
require('./steps/clients_spec.js')(apiclientsminutrade.app);

// Auth Tests
require('./steps/auth_spec.js')(apiclientsminutrade.app);
