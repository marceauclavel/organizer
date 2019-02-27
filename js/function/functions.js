
// fonction qui retourne la valeur la plus proche y, étant un multiple de step
// y is Number
// step is Number
// result is Number
var closestAvailable = function(step, y){
    closest = y - y%step;
    closest += ( y%step < step/2 ? 0 : step);
    return closest;
  }

// fonction qui retourne un objet Date correspondant à day
// day is String, de la forme 'd/m/yyyy', par exemple le 17 juillet 2018 correspond à '17/7/2018'
// result is Date Object
var dayToDate = function(day){
  return new Date(day.split('/')[2] +'-'+ day.split('/')[1] +'-'+ day.split('/')[0] );
}

// fonction qui retourne une String, correspondant au jour de l'objet date
// date is Date object
// result is String
var dateToDay = function(date){
  return date.getDate() + '/' + (date.getMonth()+1)+ '/' + date.getFullYear();
}

// fonction qui retourne une liste de String, correspondant aux jours de la semaine contenant je jour passé en paramètre
// day is String
// result is Array os String
var getWeekOutOfDay = function(day){

  dayDate = dayToDate(day);
  lundiDate = new Date( dayDate - 86400000*((dayDate.getDay()+6)%7) );
  lundiTime = lundiDate.getTime();
  mardiDate = new Date( lundiTime + 86400000*1);
  mercrediDate = new Date( lundiTime + 86400000*2);
  jeudiDate = new Date( lundiTime + 86400000*3);
  vendrediDate = new Date( lundiTime + 86400000*4);
  samediDate = new Date( lundiTime + 86400000*5);
  dimancheDate = new Date( lundiTime + 86400000*6);

  lundi = dateToDay(lundiDate);
  mardi = dateToDay(mardiDate);
  mercredi = dateToDay(mercrediDate);
  jeudi = dateToDay(jeudiDate);
  vendredi = dateToDay(vendrediDate);
  samedi = dateToDay(samediDate);
  dimanche = dateToDay(dimancheDate);

  return [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche];
}

// Pas encore utiles //

//procédure qui crée les éléments html, les stylise, et les place dans la mainBox
//listOfRooms is Array, contenant la liste des chambres, qui sont des Objets room
//day is String
var initRoomCssBoxes = function(listOfRooms, day){
  listOfRooms.forEach(function(room){
    room.timeTable.lineHeight = $('#mainBox').height()/numberOfRoom;
    room.timeTable.lineWidth = $('#mainBox').width();
    $('#mainBox').append('<div id="timeTableLine'+ room.id+'"></div>');
    $('#timeTableLine'+ room.id).css('position', 'absolute');
    $('#timeTableLine'+ room.id).css('top', listOfRoomsId.indexOf(room.id) * room.timeTable.lineHeight);
    $('#timeTableLine'+ room.id).css('height', room.timeTable.lineHeight);
    $('#timeTableLine'+ room.id).css('width', room.timeTable.lineWidth);
    $('#timeTableLine'+ room.id).css('background-color', 'rgba(23,67,23,0.)');
    room.timeTable.lineContainmentId = 'timeTableLine'+ room.id;
  })


}
