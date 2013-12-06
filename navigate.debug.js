jQuery.extend({
	// The settings singleton object.
	'navigateSettings': {
		api: '',
		endpoints: {}
	},
	
	// Setup to be called once to initialise the plugin.
	'navigateSetup': function (settings) {
		jQuery.extend(jQuery.navigateSettings, settings);
	},
	
	// Defines the plugin.
	'navigate': function (method) {
		var methods = {
			// Navigate directly to the URL provided.
			'goTo': function (url) {
				// Ensure the referer is passed on the request.
				jQuery('<a href="' + url + '"></a>')[0].click();
			},
			
			// Uses the params object to build the URL specified by the identifier, then navigates to it.
			'to': function (identifier, params) {
				var pattern = jQuery.navigateSettings.endpoints[identifier];
				var url = resolve(pattern, params)
				methods.goTo(url);
			},
			
			// Provide arguments to build a URL based pn the API settings.
			'api': function () {
				var result = jQuery.navigateSettings['api'];
				
				// Append each argument to the API URL, delimited with '/'.
				for (var index in arguments) {
					result += arguments[index] + '/';
				}
				
				return result;
			},
			
			// Returns the URL specified by the identifier, using the params object to build the it.
			'url': function (identifier, params) {
				var pattern = jQuery.navigateSettings.endpoints[identifier];
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
			jQuery.error('Method ' + method + ' does not exist on jQuery.navigate');
		}
	}
});
