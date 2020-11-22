/* !
 * jQuery.navigate Plugin v1.0.14
 * http://plugins.jquery.com/navigate/
 *
 * Copyright 2014 Michael Papworth
 * Released under the MIT license
 */

(function ($) {
    // The settings singleton object.
    var _navigateSettings = {
        api: '',
        endpoints: {},
    };

    var _methods = {
        // Navigate directly to the URL provided.
        goTo: function (url) {
            // Ensure the referer is passed on the request.
            $('<a></a>')
                .attr('href', url)
                .get(0)
                .click();
        },

        // Uses the params object to build the URL specified by the identifier, then navigates to it.
        to: function (identifier, params) {
            var pattern = _navigateSettings.endpoints[identifier];
            var url = resolve(pattern, params);
            _methods.goTo(url);
        },

        // Provide arguments to build a URL based on the API settings.
        api: function () {
            var result = _navigateSettings['api'];

            // Append each argument to the API URL, delimited with '/'.
            for (var index in arguments) {
                result += arguments[index] + '/';
            }

            return result;
        },

        // Returns the URL specified by the identifier, using the params object to build the it.
        url: function (identifier, params) {
            var pattern = _navigateSettings.endpoints[identifier];
            return resolve(pattern, params);
        },

        // Setup to be called once to initialise the plugin.
        navigateSetup: function (settings) {
            $.extend(_navigateSettings, settings);
        }
    };

    // Replaces placeholders contained by the pattern with the values of matching properties on the params object
    var resolve = function (pattern, params) {
        if (!params) return pattern;

        return pattern.replace(
            /{([a-zA-Z1-9]+)}/g,
            function (match, number) {
                var p = params[number];
                return p !== 'undefined' ? p : '';
            }
        );
    };

    var initOnce = function () {

        $.navigate = function (methodName) { // Define the plugin.
            if (!_methods[methodName]) {
                $.error('Method \'' + methodName + '\' does not exist on $.navigate');
                return;
            }

            return _methods[methodName].apply(
                this,
                Array.prototype.slice.call(arguments, 1)
            );
        };

        $.extend($.navigate, _methods);
    };

    initOnce();

})(window.jQuery);
