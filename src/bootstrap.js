// Define our modules

angular.module('app.components', []);
angular.module('app.pages', []);
angular.module('app.services', []);

angular.module('app', [
    'app.components',
    'app.pages',
    'app.services',

    'ui.router'
]);