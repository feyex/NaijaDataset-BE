const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
    user_id : {type: Schema.Types.ObjectId, ref: 'users', required:true},
    bill: { type: String, required: true },
	state: { type: String, required: true },
	disco: { type: String, required: true },
	meter: { type: Number, required: true },
    amount: { type: Number, required: true },
    email: {type: String, required: true },
    // token_id:{type: Schema.Types.ObjectId, ref: 'token', required:true},
    ref: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed'], 
        default: 'completed'},
    paymentMethod: { 
        type: String, 
        required:true,
        enum: ['Verve', 'Card'],
        default: 'Card'},
}, {
    timestamps: true
});

const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;



