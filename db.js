// var JSONStream = require('JSONStream')
// var mongojs = require('mongojs')
// var db = mongojs('mongodb://10.0.0.159:27017/testdb', ['test'])

// var test = {
//   "id": 1,
//   "all": false,
//   "sAtrium": false,
//   "sDiningRoom": false,
//   "sFamilyRoom": false,
//   "sGallery": false,
//   "sGallery2": false,
//   "sGallery3": false,
//   "sGuestBathroom": false,
//   "sHomeworkRoom": false,
//   "sLibrary": false,
//   "sLivingRoom": false,
//   "sLivingRoom 2": false,
//   "sLivingRoom 3": false,
//   "sLivingRoom3": false,
//   "sMasterBathrooms": false,
//   "sMasterBedroom": false,
//   "sNeekon'sBedroom": false,
//   "sOffice": false,
//   "sOfficeBathroom": false,
//   "sRyan'sBathroom": false,
//   "sRyan'sBedroom": false,
//   "skitchen": false
// }
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

// var cursor = db.test.find(
//   {"id": 1}, 
// {"sMasterBedroom": true}, 
// { 
//   tailable: true, 
//   timeout: false 
// }).pipe(JSONStream.parse(['sMasterBedroom', { emitKey: true }]))
// cursor.on('data', function (data) {
//   console.log('key:', data.key);
//   console.log('value:', data.value);
// })

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
// console.log("person's possesive")
var db = {
	0: "Kitchen",
	1: "Livingroom",
	2: "Livingroom 2",
	3: "Livingroom 3",
	4: "Gallery",
	5: "Gallery 2",
	6: "Gallery 3",
	7: "Office",
	8: "Neekon's Bedroom",
	9: "Homework Room",
	10: "Dining Room",
	11: "Atrium",
	12: "Library",
	13: "Master Bedroom",
	14: "Master Bathroom",
	15: "Family Room",
	16: "Guest Bathroom",
	17: "Outdoor Wall",
	18: "Outdoor Strip",
	19: "Outdoor Trees & Fence"
}
// db.foreach((item, i) => {
// 	console.log('(${item}, ${i})')
// })
// console.log(`the last key digit is: ${Object.keys(db).length -1}`)
for (i = 0; i < Object.keys(db).length; i++) {
	console.log(db[i])
}