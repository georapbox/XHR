XHR.js
===

####A vanilla javascript wrapper for the <code>XMLHttpRequest</code> object.

## Usage Example
```js
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
```


##Options
- <code>method {string}</code> Type of request. Default value is <code>get</code>.
- <code>url {string}</code> Request url (relative path). Default value is <code>''</code>.
- <code>async {boolean}</code> Defines if request is asynchronous or not. Default value is <code>true</code>.
- <code>serialize {boolean}</code> Defines if forms data sent in a POST request should be serialized. Default value is <code>false</code>.
- <code>data {string|object}</code> Data to be sent as the body of the request. Default value is <code>null</code> for browser compatibility issues.
- <code>contentType {string}</code> Sets the Content Type of the request. Default value is <code>application/x-www-form-urlencoded</code>.
- <code>customHeaders {array}</code> Sets custom request headers. Expects an array of objects. Default value is <code>[]</code>.
- <code>success {function}</code> Callback function to handle success. Default is <code>function () {}</code>.
- <code>error {function}</code> Callback function to handle error. Default is <code>function () {}</code>.


##Browser Compatibility
- IE7+
- All real (updated) browsers