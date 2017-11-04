var db = require("diskdb")
db.connect("src/static", ["offline"])
var r1 = {
  name: "all",
  state: false
}
var r1 = {
  name: "sAtrium",
  state: false
}
var r2 = {
  name: "sDiningRoom",
  state: false
}
var r3 = {
  name: "sFamilyRoom",
  state: false
}
var r4 = {
  name: "sGallery",
  state: false
}
var r5 = {
  name: "sGallery2",
  state: false
}
var r6 = {
  name: "sGallery3",
  state: false
}
var r7 = {
  name: "sGuestBathroom",
  state: false
}
var r8 = {
  name: "sHomeworkRoom",
  state: false
}
var r9 = {
  name: "sLivingRoom",
  state: false
}
var r10 = {
  name: "sLivingRoom 2",
  state: false
}
var r11 = {
  name: "sLivingRoom 3",
  state: false
}
var r12 = {
  name: "sMasterBathrooms",
  state: false
}
var r13 = {
  name: "sMasterBedroom",
  state: false
}
var r14 = {
  name: "sNeekon'sBedroom",
  state: false
}
var r15 = {
  name: "sOffice",
  state: false
}
var r16 = {
  name: "sOfficeBathroom",
  state: false
}
var r17 = {
  name: "sRyan'sBathroom",
  state: false
}
var r18 = {
  name: "sRyan'sBedroom",
  state: false
}
var r19 = {
  name: "skitchen",
  state: false
}
var i = 1
var collections = []
for (i; i<=19; i++) {
  var single = `r${i}`
  collections.push(single)
}
db.offline.save([r1])
console.log(collections)
console.log(db.offline.find())