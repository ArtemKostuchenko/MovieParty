const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    code: {
        type: String,
        required: [true, 'Please provide code'],
    }
});

module.exports = mongoose.model('Country', CountrySchema);