// const mongoose = require('mongoose');
// const mongoUri = 'mongodb://localhost/price_volume_chart_service';

// const db = mongoose.connect(mongoUri);

// module.exports = db;

const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '54.67.73.252',
  database: 'pricevolume',
  password: 'postgres',
  port: '5432',
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to Postgres');
  }
});

module.exports = client;
