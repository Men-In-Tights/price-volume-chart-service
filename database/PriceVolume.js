const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const connection = mongoose.createConnection("mongodb://localhost/price_volume_chart_service");

const priceVolumeSchema = new mongoose.Schema({
    id: Number,
    symbol: String,
    name: String,
    prices: [Number],
    volumes: [Number],
    lowest: Number,
    highest: Number,
    averagePrice: Number,
    currentPrice: Number
})

const PriceVolume = mongoose.model('PriceVolume', priceVolumeSchema);

module.exports = PriceVolume;