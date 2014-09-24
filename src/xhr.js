/*jshint camelcase: true, curly: true, eqeqeq: true, forin: true, freeze: true, immed: true, latedef: nofunc, newcap: true, noarg: true, noempty: true, nonbsp: true, nonew: true, plusplus: true, quotmark: single, undef: true, unused: strict, browser: true, devel: true, indent: 4*/

/**
 * XHR.js
 * A vanilla javascript wrapper for the XMLHttpRequest object.
 * @version 0.1.0
 * @author George Raptis <https://github.com/georapbox>
 * @license MIT <http://www.opensource.org/licenses/mit-license.php>
 */
(function (name, context, definition) {
	context[name] = definition();
}('XHR', this, function () {
	var helpers = {
		extend: function() {
			'use strict';
			for (var i = 1, l = arguments.length; i < l; i += 1) {
				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)) {
						if (arguments[i][key] && arguments[i][key].constructor && arguments[i][key].constructor === Object) {
							arguments[0][key] = arguments[0][key] || {};
							helpers.extend(arguments[0][key], arguments[i][key]);
						} else {
							arguments[0][key] = arguments[i][key];
						}
					}
				}
			}
			return arguments[0];
		},
		
		serialize: function (form) {
			var parts = [],
				field = null,
				i,
				len,
				j,
				optLen,
				option,
				optValue;

			for (i = 0, len = form.elements.length; i < len; i += 1) {
				field = form.elements[i];
				
				switch (field.type) {
					case 'select-one':
					case 'select-multiple':
						if (field.name.length) {
							for (j = 0, optLen = field.options.length; j < optLen; j += 1) {
								option = field.options[j];
								
								if (option.selected) {
									optValue = '';
									
									if (option.hasAttribute) {
										optValue = (option.hasAttribute('value') ? option.value : option.text);
									} else {
										optValue = (option.attributes.value.specified ? option.value : option.text);
									}
									
									parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
								}
							}
						}
					break;
					case undefined:    // fieldset
					case 'file':       // file input
					case 'submit':     // submit button
					case 'reset':      // reset button
					case 'button':     // custom button
					break;
					case 'radio':      // radio button
					case 'checkbox':   // checkbox
						if (!field.checked) {
							break;
						}
						/* falls through */
					default:
						// Don't include form fields without names.
						if (field.name.length) {
							parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
						}
				}
			}
			return parts.join('&');
		}
	};
	
	var XHR = function (options) {
		var that = this,
			defaults,
			xhr,
			i,
			customHeadersLen,
			customHeadersItem;
		
		// Define default options.
		defaults = {
			method: 'get',                                       // Type of request.
			url: '',                                             // Request url (relative path).
			async: true,                                         // Defines if request is asynchronous or not.
			serialize: false,                                    // Defines if forms data sent in a POST request should be serialized.
			data: null,                                          // Data to be sent as the body of the request. Default is "null" for browser compatibility issues.
			contentType: 'application/x-www-form-urlencoded',    // Sets the Content Type of the request.
			customHeaders: [],                                   // Set custom request headers. Default value is empty array.
			success: function () {},                             // Callback function to handle success.
			error: function () {}                                // Callback function to handle errors.
		};
		
		// Extend the default options with user's specified ones.
		options = helpers.extend({}, defaults, options);
		
		that.method = options.method;
		that.url = options.url;
		that.async = options.async;
		that.serialize = options.serialize;
		that.data = options.data;
		that.contentType = options.contentType;
		that.customHeaders = options.customHeaders;
		that.success = options.success;
		that.error = options.error;
		
		customHeadersLen = that.customHeaders.length;
		
		// Create a new XMLHttpRequest. 
		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () {
			// if request is completed, handle success or error states.
			if (xhr.readyState === 4) {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
					that.success(xhr.status, xhr.responseText);
				} else {
					that.error(xhr.status, xhr.responseText);
				}	
			}
		};
		
		// Prepare the request to be sent.
		xhr.open(that.method, that.url, that.async);
		
		// Set "Content-Type".
		if (that.contentType !== false) {
			xhr.setRequestHeader('Content-Type', that.contentType);
		}
		
        // Set custom headers.
		if (customHeadersLen > 0) {
			for (i = 0; i < customHeadersLen; i += 1) {
				customHeadersItem = that.customHeaders[i];
				
				if (typeof customHeadersItem === 'object') {
					for (var prop in customHeadersItem) {
						if (customHeadersItem.hasOwnProperty(prop)) {
							xhr.setRequestHeader(prop, customHeadersItem[prop]);
						}
					}	
				} else {
					throw new Error('Property "customHeader" expects an array of objects for value.');
				}
			}
		}
		
        // Serialize form if option set to "true".
		if (that.serialize === true) {
			that.data = helpers.serialize(that.data);
		}
        
        // Send data.
		xhr.send(that.data);
		
		return that;
	};
	
	return XHR;
}));