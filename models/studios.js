const mongoose = require('mongoose');

const studioNames = mongoose.Schema({
    name: {type: String, default: ''},
    role: {type: String, default: ''},
    image: {type: String, default: 'default.png'},
    member: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

module.exports = mongoose.model('Studio', studioNames);