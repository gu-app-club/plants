var request = require('request');

request.post('http://www.yoursite.com/formpage', {
     json: {
          key: 'value'
     }
}, function(error, response, body) {
     if (!error && response.statusCode == 200) {
          console.log(body)
     }
});
