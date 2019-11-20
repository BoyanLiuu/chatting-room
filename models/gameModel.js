const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: 'default.png'},
    fans: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

const game = mongoose.model('game', gameSchema);

module.exports = game;