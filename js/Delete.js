var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: req.Campaign Name};
  dbo.collection("ServiceGroup").deleteOne(myquery, function(err, CampaignName) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
