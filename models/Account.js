import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    spends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spend',
        required: false
    }],
    totalBalance: {
        type: Number,
        required: true,
        default: 0
    },
    deposits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deposit',
        required: false
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);
export default Account;