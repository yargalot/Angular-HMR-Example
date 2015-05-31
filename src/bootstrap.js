// Define our modules

angular.module('app', [
    require('./pages'),
    require('./data-flow/api-service').name,
    require('./components').name,
    'ui.router'
]);
