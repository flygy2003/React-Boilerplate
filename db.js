var JSONStream = require('JSONStream')
var mongojs = require('mongojs')
var db = mongojs('mongodb://10.0.0.159:27017/testdb', ['test'])

var test = {
  "id": 1,
  "all": false,
  "sAtrium": false,
  "sDiningRoom": false,
  "sFamilyRoom": false,
  "sGallery": false,
  "sGallery2": false,
  "sGallery3": false,
  "sGuestBathroom": false,
  "sHomeworkRoom": false,
  "sLibrary": false,
  "sLivingRoom": false,
  "sLivingRoom 2": false,
  "sLivingRoom 3": false,
  "sLivingRoom3": false,
  "sMasterBathrooms": false,
  "sMasterBedroom": false,
  "sNeekon'sBedroom": false,
  "sOffice": false,
  "sOfficeBathroom": false,
  "sRyan'sBathroom": false,
  "sRyan'sBedroom": false,
  "skitchen": false
}
// var state = true
// var room = "sOffice"
// var obj = {}
// obj[room] = state
// db.test.insert(test)

// // db.test.findOne({"id": 1}, function(err, doc){
// //   console.log(doc['sOffice'])
// //   console.log(doc)
// // })

// pipe all documents in mycollection to stdout

var cursor = db.test.find(
  {"id": 1}, 
{"sMasterBedroom": true}, 
{ 
  tailable: true, 
  timeout: false 
}).pipe(JSONStream.parse(['sMasterBedroom', { emitKey: true }]))
cursor.on('data', function (data) {
  console.log('key:', data.key);
  console.log('value:', data.value);
})

// // db.test.findAndModify({
// //   query: { "id": 1 },
// //   update: { $set: obj },
// //   new: true
// // }, (err, doc, lastErrorObject) => {
// //   if (err) {
// //     console.log(lastErrorObject)
// //     throw err
// //   } else {
// //     console.log(doc)
// //   }
// // })