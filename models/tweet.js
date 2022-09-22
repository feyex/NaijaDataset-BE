const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema ({
    userId: {type: Schema.Types.ObjectId, ref: 'users', required:true},
    message: { type: String, required: true},
    source: { type: String},
    area: { type: String},
    sentiment: {type: Number},
    url: { type: String},
    userPolarity: { type: String},
    language: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('tweet', tweetSchema)
