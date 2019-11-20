var request = require("request");
var fs = require("fs");


var options = { method: 'GET',
    url: 'https://api.twitch.tv/helix/games/top',
    qs: { offset: '0', first: '50' },
    headers:
        { 
            'Client-ID': 'vzzdwpzk6cx56cbhca84zb612rc9qj' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    fs.writeFile('./data.json', body, { flag: 'w' }, function(err) {
        if (err)
            return console.error(err);
    });
});

