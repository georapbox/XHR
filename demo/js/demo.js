/*jshint expr: true, browser: true, devel: true*/
/*global XHR*/

/**
 * FORM POST DEMO
 */
(function () {
	var form = document.getElementById('myform'),
		submitBtn = document.getElementById('send'),
		responsePlaceholder = document.getElementById('form_response');

	submitBtn.onclick = function (e) {
		e = e || window.event;
		(e.preventDefault) ? e.preventDefault() : e.returnValue = false;

		var xhr = new XHR({
			method: 'post',
			url: 'php/test.php',
			async: true,
			serialize: true,
			data: form,
			contentType: 'application/x-www-form-urlencoded',
			customHeaders: [
				{'Custom-Header-1': 'Value 1'},
				{'Custom-Header-2': 'Value 2'}
			],
			success: function (status, responseText, responseXML, statusText) {
				responsePlaceholder.innerHTML = '<pre>' + responseText + '</pre>';
			},
			error: function (status, responseText, responseXML, statusText) {
				responsePlaceholder.innerHTML = 'Request was unsuccessful: ' + status + ', ' + statusText;
			}
		});
	};
}());

/**
 * OBJECT SUBMISSION DEMO
 */
(function () {
	var responsePlaceholder = document.getElementById('object_response');

	var obj = {
		foo: 'FOO!',
		bar: 'BAR!',
		fooBar: {
			foo: 'foo',
			bar: 'bar'
		}
	};

	document.getElementById('submitObject').onclick = function () {
		var xhr = new XHR({
			method: 'post',
			url: 'php/test.php',
			async: true,
			data: 'obj=' + JSON.stringify(obj),
			contentType: 'application/x-www-form-urlencoded',
			success: function (status, responseText, responseXML, statusText) {
				responsePlaceholder.innerHTML = '<pre>' + responseText + '</pre>';
			},
			error: function (status, responseText, responseXML, statusText) {
				responsePlaceholder.innerHTML = 'Request was unsuccessful: ' + status + ', ' + statusText;
			}
		});
	};
}());

/**
 * GET EXAMPLE
 */
(function () {
	var responsePlaceholder = document.getElementById('get_response');
	
	document.getElementById('submitGet').onclick = function () {
		var xhr = new XHR({
			method: 'get',
			url: 'php/test.php?foo=FOO!&bar=BAR!',
			async: true,
			data: null,
			contentType: 'application/x-www-form-urlencoded',
			success: function (status, responseText, responseXML, statusText) {
				responsePlaceholder.innerHTML = '<pre>' + responseText + '</pre>';
			},
			error: function (status, responseText, responseXML, statusText) {
				responsePlaceholder.innerHTML = 'Request was unsuccessful: ' + status + ', ' + statusText;
			}
		});
	};
}());


function openModal(modalID) {
	document.getElementById(modalID).className = 'modal visible';
}

function closeModal(modalID) {
	document.getElementById(modalID).className = 'modal hidden';
}