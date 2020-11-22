# jQuery.navigate

An abstraction on site navigation wrapped up in a jQuery plugin. When using website analytics, `window.location` is not sufficient due to the referer not being passed on the request. The plugin resolves this and allows for both aliased and parametrised URLs. I also provide an API helper method, which enables quick and simple ReSTful URL building capability.

[![Build Status](https://travis-ci.org/michaelpapworth/jQuery.navigate.png?branch=master)](https://travis-ci.org/michaelpapworth/jQuery.navigate)

## The Setup

```js
$(document).ready(function () {
  $.navigateSetup({
    api: '/api/',
    endpoints: {
      home: '/michaelpapworth',
      myAwesomePlugin: '/{user}/{repo}',
    },
  });
});
```

## Usage

The examples below are based on the setup above, let's assume the root of the site is http://github.com.

How to navigate to the preconfigured **endpoints**?

```js
// Address bar will read http://github.com/michaelpapworth
$.navigate('to', 'home');
$.navigate.to('home'); //alternative syntax

// Address bar will read http://github.com/michaelpapworth/jQuery.navigate
$.navigate('to', 'myAwesomePlugin', {
  user: 'michaelpapworth',
  repo: 'jQuery.navigate',
});
$.navigate.to('myAwesomePlugin', {
  user: 'michaelpapworth',
  repo: 'jQuery.navigate',
});
```

Want to navigate to a **specific URL**?

```js
$.navigate('goTo', 'http://github.com/michaelpapworth/jQuery.navigate');
$.navigate.goTo('http://github.com/michaelpapworth/jQuery.navigate');
```

What about your **API**?

```js
var url = $.navigate.api('resource', 123); // /api/resource/123
$.ajax({ type: 'GET', url: url }).done(function (data) {
  console.log('This data came from "http://github.com/api/resource/123"');
});
```

I just want the **URL**?

```js
// Just use the endpoints to build the URL for me
var homepageUrl1 = $.navigate('url', 'home');
var homepageUrl2 = $.navigate.url('home');
```

## Want to roll your own or contribute?

1. Fork this repository and create a new branch if you intend to contribute your work.
2. Clone the branch to your computer.
3. In the console `cd jQuery.navigate && npm run-script build`.
4. Enable the build as you save your work `npm start`.
