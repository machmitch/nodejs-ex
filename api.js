var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var database = "db_kyw";
var url = 'mongodb://mongodb-himanshu-kyw.1d35.starter-us-east-1.openshiftapps.com/' + database;
// if OPENSHIFT env variables are present, use the available connection info:
  if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    url = "mongodb://" + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
  };
	
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  var collection = db.collection('users');
  collection.insert({u_name:"Anthony"});
  // collection.insert({u_name:"Anthony"});
  
  // var duplicateRecordId = findDuplicateRecordId(collection);
  // removeEntry(collection, duplicateRecordId);
  //listAllRecords(collection);
  db.close();
});

function removeEntry(collection, id) {
	console.log("got id"+id);
	// collection.deleteOne({_id : id});
}

function findDuplicateRecordId(collection) {
	var prevName = "";
	var returnValue ="";
	
	var cursor = collection.find();
	cursor.each(function(err, doc) {
	  if (err) 
		  throw err;
	  if (doc) {
		var username = doc.u_name;
		if (username === prevName) { 
			returnValue = doc._id;
		}
		prevName = username;
	  }
	});
	return returnValue;
}

function listAllRecords(collection) {
	var cursor = collection.find();
	cursor.each(function(err, doc) {
	  if (err) 
		  throw err;
	  if (doc) {
		var username = doc.u_name;
		var objId = new Buffer(doc._id.id).toString('hex');
		console.dir(objId);
		console.dir(username);
	  }
	});
}