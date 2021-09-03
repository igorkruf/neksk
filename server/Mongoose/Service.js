let mongoose = require('mongoose')

let serviceSchema = new mongoose.Schema({
    url_logo_service: String,
    name_service: String,
    paretn_service: Array,
    min_price_service: { type: Number, default: 23 },
},
    {
        collection: 'allservices',
    }



)
let Service = mongoose.model('Service', serviceSchema);
module.exports = Service;


