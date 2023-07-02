1- When receiving data from a web server, the data is always a string. Parse the data with JSON.parse(), and the data becomes a JavaScript object.

2- JSON.parse() on a JSON derived from an array, the method will return a JavaScript array, instead of a JavaScript object.

3- 