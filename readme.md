# Javascript Breakpoints

Small library that uses CSS media queries to trigger breakpoints in Javascript.   Helpful to change Javascript logic for different screen sizes, resolutions or [other media query features](http://www.w3.org/TR/css3-mediaqueries/#media1).

[View demo](http://14islands.github.com/js-breakpoints/) 


## Example using Sass & Javascript

The breakpoint are defined in the CSS,  here is an example using Sass.

```sass
@media ( min-width:600px ) {
	body {
		@include defineBreakpoint("BIG_SCREEN_BREAKPOINT");
	}
}
```

This Sass mixin fires **matched** & **exit** events in the Javascript as seen in the following example.

```js
Breakpoints.on({
	name: "BIG_SCREEN_BREAKPOINT",
	matched: onMatch,
	exit: onExit
});

function onMatch() {
	// some logic
}

function onExit() {
	// remove logic
}
```

The **matched** event is fired when the media query is matched but the **exit** event is fired when exiting the breakpoint.


### Why not use matchMedia?

An other way to accomplish breakpoints in Javascript is to use the [**window.matchMedia** method](https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia).  The problem is that it requires us to keep track of the breakpoints in two places,  both in the CSS and Javascript,  that can be hard to manage on bigger projects.


## Recommendations

This library was build with the following recommendations in mind. 


### Mobile first approach

It's most common to have more logic for bigger screens than on smaller screens.   That is why we recommend to write Javascript for small screens first and add the breakpoints as scaling up to bigger screens.  

Mobile first is also good when implementing the CSS and makes the code simpler to manage.  This will also make  Javascript run faster on smaller screens as we usually add features as we scale up.


### Define breakpoints based on content

There are so many different screen sizes and resolutions on devices today that it's close to impossible to set breakpoints to fit all these variations.  

A more sensible approach in most cases is to define different breakpoints based on the content.  Javascript Breakpoints are defined on DOM elements so its possible to have breakpoints that are specific for the content at hand.


## How does it work?

Behind the scenes the Javascript is checking for **content** changes on **:after** pseudo element on DOM elements.  

This is how the CSS looks without any **mixin**.

```css
@media ( min-width:600px ) {
	body:after {
		display:none;
		content: "BIG_SCREEN_BREAKPOINT";
	}
}
```

A simple example of how the matching works can be found here: https://github.com/archive/breakpoints/blob/master/share-between-css-and-javascript/index.html

The matching in the Javascript is done on **initialization**, **onresize** and **onorientationchange** events.   There is a few milliseconds delay when matching on resize and orientation change to make sure matching is not done to multiple times. 



### Limitations

There can only one breakpoint active per DOM element. If DOM elements have multiple breakpoints, only the most specific media query will fire the associated Javascript handler. 

This approach is not standard compliance.  Using the content attribute to host data is not a standard way to use it.  Using the html5 data attribute would be much nicer if it was possible to change that with CSS.


## Breakpoint Model Object 

The Breakpoint object holds the following information about specific breakpoints.

### name

The name of the breakpoint,  should be the same as its specified in the CSS.

### matched

Callback function that is fired when the specific breakpoint is matched.

### exit

Callback function that is fired when the user hits the specific breakpoint.

### context

Sets the context for the callback functions,  usually set to the *this* keyword.


### notMatched() 

Helper function to check at any time if the breakpoint is not matched.  Returns a boolean.



## Breakpoints Events Object

Breakpoints is a global object that holds an array of breakpoint events that are specified on DOM elements within the CSS.

### Breakpoints.on( breakpoint )

Binds a listener to breakpoints in the CSS.  The *entry* and *exit* callbacks will be invoked as user resizes or changes orientation of the device.  Returns an breakpoint object that can be used to check the state of the breakpoint.

### Breakpoints.off( name )

Removes a previously-bound breakpoint.

### Breakpoints.isMatched( name )

Provides a way to check if a breakpoint is entered without firing any events.  Returns a boolean.


## Browser support

Works on modern browsers.


## Contributors

* Hjörtur Hilmarsson [@hjortureh](https://twitter.com/hjortureh)
* David Lindkvist [@ffdead](https://twitter.com/ffdead)
* Anders Jönsson [@anjonsson](https://twitter.com/anjonsson)





