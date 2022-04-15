const { strict } = require('jade/lib/doctypes');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const leaderSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    abbr:{
        type: String,
        default: ''
    },
    description:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true
    }
    
);

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;