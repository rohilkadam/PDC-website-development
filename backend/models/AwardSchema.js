const mongoose = require('mongoose')
const { Schema } = mongoose;

const AwardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    issuedBy: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

});

const Award = mongoose.model('award', AwardSchema)
module.exports = Award