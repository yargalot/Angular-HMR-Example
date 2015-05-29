var ANGULAR_MODULE;
var MODULE_CACHE;

var COMPILEPROVIDER;

var _cache = {};
var templateCache = {};
var controllerCache = {};
var PRIORITY = {};
var directiveCache = {};


var save = function(n, obj, exists) {

    var changes = false;


    changes = changes || JSON.stringify(obj.template) != JSON.stringify(templateCache[n]);
    if (obj.template) {
        templateCache[n] = obj.template;
    }


    changes = changes || obj.controller + '' != controllerCache[n] + '';
    if (obj.controller) {
        controllerCache[n] = obj.controller;
    }



    if (changes && exists) {
        var elm = angular.element(document.querySelector('[ng-app]'));
        if (elm) {
            if (elm.injector().has('$state')) {
                var $state = elm.injector().get('$state');

                $state.transitionTo($state.current, $state.params, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            } else {
                elm.injector().get('$compile')(elm.contents())(elm.scope());
            }
        }
    }

    return changes;
};


var transform = function(n, obj) {

    if (obj.template) {
        obj.template = function() {
            console.log(templateCache[n]);
            return templateCache[n];
        };
    }

    console.log('TypeOf function', typeof obj.controller === 'function')
    if (obj.controller && typeof obj.controller === 'function') {
        obj.controller = function($injector, $scope) {
            console.log(controllerCache[n], this);
            return $injector.invoke(controllerCache[n], this, {
                '$scope': $scope
            });
        };
    }

    // obj = directiveCache[n];
    // obj.priority = PRIORITY[n]++;
    // //obj.terminal = true;


    return obj;
};

var directive = function(n, d) {
    var obj = d();
    var exists = MODULE_CACHE[n];
    console.log(n, obj);

    console.log(exists);
    console.log(ANGULAR_MODULE);

    // directiveCache[n] = obj;

    var changes = save.bind(this)(n, obj, exists);

    if (!exists) {
        ANGULAR_MODULE.directive(n, function() {
            return transform(n, obj);
        });
        MODULE_CACHE[n] = true;
    } else {
        if (!changes) {
            window.location.reload();
        }
    }



    return {
        directive: directive
    };

};


module.exports = (function() {
    return {
        module: function(identifier) {
            ANGULAR_MODULE = angular.module(identifier);
            if (!_cache[identifier]) {
                // ANGULAR_MODULE.config(function($compileProvider) {
                //     COMPILEPROVIDER = $compileProvider;
                // });

                _cache[identifier] = {};
            } else {
                _cache[identifier] = _cache[identifier];
            }


            MODULE_CACHE = _cache[identifier];

            return {
                directive: directive
            };
        }
    }
})();
