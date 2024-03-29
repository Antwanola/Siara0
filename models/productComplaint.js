const mongoose = require('mongoose')
const Schema = mongoose.Schema

const complaint = new Schema({
    user:[{
        type:Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    name: {
        type: String,
    },
    phone: {
        type: String
    },
    state: {
        type: String,

    },
    lga: {
        type: String,


    },
    street: {
        type: String,

    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    product_type: {
        type: String
    },
    product_brand: {
        type: String,

    },

    batch_number: {
        type: String,

    },
    product_narration: {
        type: String,

    },
    supplier: {
        type: String
    },
    expiry_date: {
        type: String,
    },
    anonymous: {
        type: String,
    },
    status:{
        type: String
    },
    attended:{
        type:String
    },
    media:{
        type:String
    },
    postedTime:{
        type:Date,
        default:new Date()
    }



})

module.exports = mongoose.model('productComplaint', complaint)