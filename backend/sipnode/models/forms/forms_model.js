let mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const server = '127.0.0.1:27017'
const database = 'sipbackend'
mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true
});
let form_schema = new mongoose.Schema({
    id: {
        type: 'Number'
    },
    postedBy: {
        type: 'String'
    },
    subForum: {
        type: 'String'
    },
    upVotes: {
        type: 'Number'
    },
    downVotes: {
        type: 'Number'
    },
    bodyText: {
        type: 'String'
    },
    bodyImage: {
        type: 'String'
    },
    uVoted: {
        type: 'Boolean'
    },
    dVoted: {
        type: 'Boolean'
    },
    noComments: {
        type: 'Number'
    },
    comments: {
        type: [
            'Mixed'
        ],
    }
})
form_schema.plugin(timestamp)
module.exports = mongoose.model('forms', form_schema)