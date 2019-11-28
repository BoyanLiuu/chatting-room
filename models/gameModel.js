const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: 'https://via.placeholder.com/285x380.png?%20C/O%20https://placeholder.com/'},
    fans: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

const game = mongoose.model('game', gameSchema);

module.exports = game;