let mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const server = '127.0.0.1:27017'
const database = 'sipbackend'
mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true
});
let user_schema = new mongoose.Schema({
    username: {
        type: 'String'
    },
    id: {
        type: 'String'
    },
    email: {
        type: 'String'
    },
    created: {
        type: 'Date'
    },
    registered_forms: {
        type: [
            'String'
        ]
    },
    password: {
        type: 'String'
    }
})
module.exports = mongoose.model('usermodel', user_schema)