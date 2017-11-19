// var combo = {
//   'skitchen': [7, 40, 36, 16],
//   'sLivingRoom': [31],
//   'sOffice': [22, 32],
//   'sNeekon\'sBedroom': [18],
//   'sHomeworkRoom': [33],
//   'sDiningRoom': [13],
//   'sGallery': [35],
//   'sGallery2': [29],
//   'sGallery3': [12],
//   'sLivingRoom 2': [15],
//   'sAtrium': [11],
//   'sLivingRoom 3': [38]
// },
//   rooms = [
//     'skitchen',
//     'sLivingRoom',
//     'sOffice',
//     'sNeekon\'sBedroom',
//     'sHomeworkRoom',
//     'sDiningRoom',
//     'sGallery',
//     'sGallery2',
//     'sGallery3',
//     'sLivingRoom 2',
//     'sAtrium',
//     'sLivingRoom 3']
// rooms.forEach(item => {
//   console.log(combo[item])
// })
// // function switchOne(id) {
// //   console.log(rooms[id])
// // }
// // switchOne('office')
var combo = {
  'skitchen': [7, 40, 36, 16],
  'sLivingRoom': [31],
  'sOffice': [22, 32],
  'sNeekon\'sBedroom': [18],
  'sHomeworkRoom': [33],
  'sDiningRoom': [13],
  'sGallery': [35],
  'sGallery2': [29],
  'sGallery3': [12],
  'sLivingRoom 2': [15],
  'sAtrium': [11],
  'sLivingRoom 3': [38]
},
  rooms = [
    'skitchen',
    'sLivingRoom',
    'sOffice',
    'sNeekon\'sBedroom',
    'sHomeworkRoom',
    'sDiningRoom',
    'sGallery',
    'sGallery2',
    'sGallery3',
    'sLivingRoom 2',
    'sAtrium',
    'sLivingRoom 3'],
  num_children = 0
rooms.forEach(item => {
    combo[item].forEach((items) => {
      console.log(items)
    })
})