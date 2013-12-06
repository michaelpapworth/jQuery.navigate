jQuery.extend({
	'navigateSettings': {
		api: '',
		endpoints: {}
	},
	'navigateSetup': function (settings) {
		jQuery.extend(jQuery.navigateSettings, settings);
	},
	'navigate': function (method) {
		var methods = {
			goTo: function (url) {
				jQuery('<a href="' + url + '"></a>')[0].click();
			},
			to: function (identifier, params) {
				var pattern = jQuery.navigateSettings.endpoints[identifier];
				var url = resolve(pattern, params)
				methods.goTo(url);
			},
			api: function () {
				var result = jQuery.navigateSettings['api'];
				for (var index in arguments) {
					result += arguments[index] + '/';
				}
				return result;
			},
			url: function (identifier, params) {
				var pattern = jQuery.navigateSettings.endpoints[identifier];
				return resolve(pattern, params)
			},
		};

		var resolve = function (pattern, params) {
			return pattern.replace(/{([a-zA-Z1-9]+)}/g, function (match, number) {
				return typeof params[number] != 'undefined' ? params[number] : '';
			});
		};

		if (methods[method])
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else
			jQuery.error('Method ' + method + ' does not exist on jQuery.navigate');
	}
});
