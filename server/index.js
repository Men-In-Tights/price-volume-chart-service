const express = require('express');
const bodyParser = require('body-parser');
const PriceVolume = require('../database/PriceVolume.js');
const app = express();
const PORT = 3002;

app.use(express.static(__dirname+'/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//API Service
app.get('/api/volumes/symbols/:id', function(req, res){
  PriceVolume.find({id: req.params.id}, (err, data)=>{
    if(err) console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })
})

app.delete('/api/volumes/symbols/:id', function(req, res) {
  PriceVolume.findOneAndRemove({id: req.params.id}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(202).send("Record successfully deleted")
    }
  })
})

app.patch('/api/volumes/symbols/:id', function(req, res) {
  PriceVolume.findOneAndUpdate({id: req.params.id}, {$set: req.body}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Successful update');
    }
  })
})

app.post('/api/volumes/symbols/', function(req, res) {
  PriceVolume.create(req.body, function(req, res) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('Post succesful!')
    }
  })
})

// app.post('/api/volumes/symbols/:id', function(req, res) {
//   PriceVolume.create({
//     id: req.params.id,
//     symbol: req.body.symbol,
//     name: req.body.name,
//     prices: req.body.prices,
//     volumes: req.body.volumes,
//     lowest: req.body.lowest,
//     highest: req.body.highest,
//     averagePrice: req.body.averagePrice,
//     currentPrice: req.body.currentPrice
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Post successful!');
//     }
//   })
// })



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
