/*global window:true */

window.Breakpoints = (function (window, document) {
	'use strict';

	var B = {},
	resizingTimeout = 200,
	breakpoints = [],

	debounce = function (func, wait, immediate) {
		var timeout, result;
		return function() {

			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) result = func.apply(context, args);
			};

			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) result = func.apply(context, args);
			return result;
		};
	},

	removeDoubleQuotes = function (content) {
		if(content && content.length) {
			return content.replace(/\"/g, "");
		}
		return "";
	},

	check = function (breakpoint) {
		var match = B.isMatched(breakpoint);
	    breakpoint.matched = breakpoint.matched || function() {};
	    breakpoint.exit = breakpoint.exit || function() {};

		if (match && !breakpoint.isMatched) {
			breakpoint.matched.call(breakpoint.context);
			breakpoint.isMatched = true;
		} else if (!match && breakpoint.isMatched) {
			breakpoint.exit.call(breakpoint.context);
			breakpoint.isMatched = false;
		}
		return breakpoint;
	},

	onWindowResize = function () {
		for( var i = 0; i < breakpoints.length; i++ ) {
			check(breakpoints[i]);
		}
	},

	init = function () {
		var debounceResize = debounce( onWindowResize, resizingTimeout);
		window.onresize = debounceResize;
		window.onorientationchange = debounceResize;
		return B;
	};

	B.isMatched = function(breakpoint) {
		breakpoint.el = breakpoint.el || document.body;

		var content = window.getComputedStyle(breakpoint.el, ':after').getPropertyValue('content');
		content = removeDoubleQuotes(content)
		return breakpoint.name === content;
	};

	B.on = function(breakpoint) {
		breakpoints.push(breakpoint);
		breakpoint.isMatched = false;

		breakpoint.notMatched = function (callback) {
			callback = callback || function() {};

			if (!B.isMatched(breakpoint)) {
				callback();
				return true;
			}
			return false;
		};


		return check(breakpoint);
	};

	return init();

})(window, document);




