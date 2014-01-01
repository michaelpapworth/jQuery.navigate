/* !
 * jQuery.navigate Plugin v1.0.12
 * http://plugins.jquery.com/navigate/
 *
 * Copyright 2014 Michael Papworth
 * Released under the MIT license
 */
(function ($) {
	$.extend({
		// The settings singleton object.
		'navigateSettings': {
			api: '',
			endpoints: {}
		},

		// Setup to be called once to initialise the plugin.
		'navigateSetup': function (settings) {
			$.extend($.navigateSettings, settings);
		},

		// Defines the plugin.
		'navigate': function (method) {
			var methods = {
				// Navigate directly to the URL provided.
				'goTo': function (url) {
					// Ensure the referer is passed on the request.
					$('<a href="' + url + '"></a>')[0].click();
				},

				// Uses the params object to build the URL specified by the identifier, then navigates to it.
				'to': function (identifier, params) {
					var pattern = $.navigateSettings.endpoints[identifier];
					var url = resolve(pattern, params)
					methods.goTo(url);
				},

				// Provide arguments to build a URL based pn the API settings.
				'api': function () {
					var result = $.navigateSettings['api'];

					// Append each argument to the API URL, delimited with '/'.
					for (var index in arguments) {
						result += arguments[index] + '/';
					}

					return result;
				},

				// Returns the URL specified by the identifier, using the params object to build the it.
				'url': function (identifier, params) {
					var pattern = $.navigateSettings.endpoints[identifier];
					return resolve(pattern, params)
				},
			};

			// Replaces placeholders contained by the pattern with the values of matching properties on the params object
			var resolve = function (pattern, params) {
				if (!params) return pattern;

				return pattern.replace(/{([a-zA-Z1-9]+)}/g, function (match, number) {
					return typeof params[number] != 'undefined' ? params[number] : '';
				});
			};

			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist on $.navigate');
			}
		}
	});
}(jQuery));
