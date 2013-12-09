jQuery.navigate
===============

An abstraction on site navigation wrapped up in a jQuery plugin

The Setup
---------

```js
$(document).ready(function() {
	$.navigateSetup({
		api : '/api/',
		endpoints : {
			'home': '/michaelpapworth',
			'myAwesomePlugin': '/{user}/{repo}'
		}
	});
});
```

Usage
-----

The examples below are based on the setup above, let's assume the root of the site is http://github.com.

How to navigate to the preconfigured **endpoints**?

```js
	// Address bar will read http://github.com/michaelpapworth
	$.navigate('to', 'home');

	// Address bar will read http://github.com/michaelpapworth/jQuery.navigate
	$.navigate('to', 'myAwesomePlugin', { user : 'michaelpapworth', repo : 'jQuery.navigate' });
```

Want to navigate to a **specific URL**?

```js
	$.navigate('goTo', 'http://github.com/michaelpapworth/jQuery.navigate');	
```

What about your **API**?

```js
	$.ajax({ type: 'GET', url: $.navigate('api', 'resource', 123) })
		.done(function(data) {
			console.log('This data came from "http://github.com/api/resource/123"');
		});
```

I just want the **URL**?

```js
	// Just use the endpoints to build the URL for me
	var homepageUrl = $.navigate('url', 'home');	
```
