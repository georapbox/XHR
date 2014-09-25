XHR.js
===

####A vanilla javascript wrapper for the **XMLHttpRequest** object.

#####(Under development)

## Usage Example
<pre>
var xhr = new XHR({
    method: 'post',
    url: '<example-url>',
    async: true,
    serialize: true,
    data: document.forms[0],
    contentType: 'application/x-www-form-urlencoded',
    customHeaders: [
        {'Custom-Header-1': 'Value 1'},
        {'Custom-Header-2': 'Value 2'}
    ],
    success: function (status, responseText, responseXML, statusText) {
        console.log(status, responseText);
    	console.log(xhr.progressEvent);
    },
    error: function (status, responseText, responseXML, statusText) {
        console.log('Request was unsuccessful: ' + status + ', ' + statusText);
    }
});	
</pre>


##Options
- **method** | {String} | Type of request. Default value is "get".
- **url** | {String} | Request url (relative path). Default value is ''.
- **async** | {Boolean} | Defines if request is asynchronous or not. Default value is true.
- **serialize** | {Boolean} | Defines if forms data sent in a POST request should be serialized. Default value is false.
- **data** | {String / Object} | Data to be sent as the body of the request. Default value is "null" for browser compatibility issues.
- **contentType** | {String} | Sets the Content Type of the request. Default value is "application/x-www-form-urlencoded"
- **customHeaders** | {Array} | Sets custom request headers. Expects an array of objects. Default value is empty array.
- **success** | {Function} | Callback function to handle success. Default is empty function.
- **error** | {Function} | Callback function to handle error. Default is empty function.


##Browser Compatibility
- IE7+
- All real (updated) browsers