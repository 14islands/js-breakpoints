# JavaScript Breakpoints

Small library that syncs CSS media queries to breakpoint events in JavaScript. Helpful to change JavaScript logic for different screen sizes, resolutions or [other media query features](http://www.w3.org/TR/css3-mediaqueries/#media1).

The main benefit is that you only need to maintain your media queries in one place - in the CSS where they belong.

[View demo](http://14islands.github.com/js-breakpoints/demo/) 


## Example using SASS mixin & JavaScript

The breakpoints are defined in the CSS, here is an example using the SASS mixin.

```scss
@media ( min-width:600px ) {
	body {
		@include defineBreakpoint("GENERIC_BIG_SCREEN_BREAKPOINT");
		// generic breakpoint styles
	}
}

#myElement {
	@media ( min-width:320px ) {
		@include defineBreakpoint("SPECIFIC_CONTENT_BREAKPOINT");
		// specific styles for this element
	}
}
```
In this example we define 2 breakpoints; one generic breakpoint on the body object, and one content breakpoint for a specific DOM element. 

The following Javascript is then used to register event handlers for the **matched** & **exit** events which will be trigger automatically by the library:
```js
Breakpoints.on({
	name: "GENERIC_BIG_SCREEN_BREAKPOINT",
	matched: function(){ /* some js logic to activate*/ },
	exit: function(){ /* disa someble js logic*/ },
});

Breakpoints.on({
	name: "SPECIFIC_CONTENT_BREAKPOINT",
	el: document.getElementById("myElement"),
	matched: function(){ /* some js logic to activate*/ },
	exit: function(){ /* disa someble js logic*/ },
});
```

The **matched** event is fired when the media query is matched and the **exit** event is fired when exiting the breakpoint after being matched.

Using this approach you can have one active media query per DOM element on the page, at the same time.


### Why not just use matchMedia?

Another way to accomplish breakpoints in JavaScript is to use the [**window.matchMedia** method](https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia).  The problem is that it requires us to keep track of the breakpoints in two places,  both in the CSS and JavaScript,  that can be hard to manage on bigger projects.


## Recommendations

This library was build with the following recommendations in mind. 


### Mobile first approach

It's most common to have more logic for bigger screens than on smaller screens.   That is why we recommend to write JavaScript for small screens first and add the breakpoints as scaling up to bigger screens.  

Mobile first is also good when implementing the CSS and makes the code simpler to manage.  This will also make  JavaScript run faster on smaller screens as we usually add features as we scale up.


### Define breakpoints based on content

There are so many different screen sizes and resolutions on devices today that it's close to impossible to set breakpoints to fit all these variations.  

A more sensible approach in most cases is to define different breakpoints based on the content.  JavaScript Breakpoints are defined on DOM elements so it's possible to have breakpoints that are very content specific.


## How does it work?

Behind the scenes the JavaScript is monitoring the **content** attribute of the **:after** pseudo element on DOM elements. We use this property to store the name of the current active breakpoint. 

The matching in the JavaScript is done on **initialization**, **onresize** and **onorientationchange** events.   There is a few milliseconds debounce delay when matching on resize and orientation change to make sure matching is not done multiple times. 

Old browsers, without support for window.getComputedStyle() on psuedo elements, injects a hidden DOM element to check if a media query is active (similar to how Modernizr does its checks).


### Limitations

There can only one breakpoint active per DOM element. If DOM elements have multiple breakpoints, only the most specific media query will fire the associated JavaScript handler. 

Using the content attribute to host data is not a standard way to use it.

The library uses the content property of html:after to check for full support for window.getComputedStyle(). If this value is modified the library will always run in fallback mode.


## Breakpoint Model Object 

The Breakpoint object holds the following information about specific breakpoints.

### name

The name of the breakpoint, should be the same as specified in the CSS.

### el

The DOM element the breakpoint is registered for, should be the same as specified in the CSS.

### matched

Callback function that is fired when the specific breakpoint is matched.

### exit

Callback function that is fired when the user hits the specific breakpoint.

### context

Sets the context for the callback functions. Default set to the *breakpoint* instance that triggered the callback.



## Breakpoints Events Object

Breakpoints is a global object that holds an array of breakpoint events that are specified on DOM elements within the CSS.

### Breakpoints.on( breakpoint )

Binds a listener to breakpoints in the CSS.  The *entry* and *exit* callbacks will be invoked as user resizes or changes orientation of the device.  Returns an breakpoint object that can be used to check the state of the breakpoint.

### Breakpoints.off( breakpoint )

Removes a previously-bound breakpoint.

### Breakpoints.isMatched( breakpoint )

Provides a way to check if a breakpoint is entered without firing any events.  Returns a boolean.


## Browser support

Tested on:
* Chrome
* Safari
* Firefox
* IE 9
* iOS 5-6 (Mobile Safari, Chrome)
* Android 4 (Native browser, Chrome)

Works best modern browsers that support [computedStyle for pseudo elements](http://caniuse.com/#feat=getcomputedstyle). Older browsers run in fallback mode which has a slight performance hit (see "How does it work?").

Compatible with IE 6-8 but since they don't support media queries you'll also need something like [Respond](http://github.com/scottjehl/Respond/).


## Contributors

* Hjörtur Hilmarsson [@hjortureh](https://twitter.com/hjortureh)
* David Lindkvist [@ffdead](https://twitter.com/ffdead)
* Anders Jönsson [@anjonsson](https://twitter.com/anjonsson)

Original idea of how the matching works can be found here: https://github.com/archive/breakpoints/blob/master/share-between-css-and-javascript/index.html






