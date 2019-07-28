let mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const server = '127.0.0.1:27017'
const database = 'sipbackend'
mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true
});
let chat_schema = new mongoose.Schema({
    _id: {
        type: 'String'
    },
    messages: {
        type: [
            'Mixed'
        ]
    }
})
chat_schema.plugin(timestamp)
module.exports = mongoose.model('chat', chat_schema)