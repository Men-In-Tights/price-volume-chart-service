const client = require('./index.js');



// app.get('api/volumes/symbols/:id', function(req, res) {
  //   db.query(`SELECT * FROM chart WHERE id = ${req.params.id};`, (err, data) => {
    //     if (err) {
      //       console.log(err)
      //     } else {
        //       res.setHeader('Content-Type', 'application/json');
        //       res.end(JSON.stringify(data));
        //     }
        //   })
        // })
        
const getVolume = (id, callback) => {
  const sql = `SELECT * FROM chart WHERE id = ${id}`;
  client.query(sql, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};        

// getVolume(34, (err, results) => {console.log(err, results)});

module.exports = {
  getVolume,
  // add,
  // update,
  // deleteItem,
};