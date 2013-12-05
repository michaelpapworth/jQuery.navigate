jQuery.navigate
===============

An abstraction on site navigation wrapped up in a jQuery plugin

The Setup
---------

```js
$.navigateSetup({
	endpoints: {
		'myAwesomePage': '/controller/action/{id}'
	}
});
```

Usage
-----

```js
function doTheAwesome(){
	$.navigate('to', 'myAwesomePage', { id: 123 });
}
```
