// Classe représentant un agenda stockant des patients en mode empilement
class StackTable{

  //numberOfRoom is Number
  constructor(numberOfRoom){
    this._numberOfRoom = numberOfRoom;
    this._patients = new Map();
    this._patientsIds = new Map();
    this._week = getWeekOutOfDay(dateToDay(new Date()));
    this._css = {
      week : {
        height : $('#mainBox').height(),
        width : $('#mainBox').width(),
        heightStep : numberOfRoom,
        widthStep : 7,
      },
      day : {
        height : new Number(),
        width : new Number(),
        heightStep : new Number(),
        widthStep : new Number(),
      }
    }

    /* on associe les méthodes à l'objet */

    this.updateDisplayWeek = this.updateDisplayWeek.bind(this);

  }

  /* Définition des accesseurs et des mutateurs */

  get numberOfRoom(){
    return this._numberOfRoom;
  }
  set numberOfRoom(numberOfRoom){
    this._numberOfRoom = numberOfRoom;
  }

  set patients(foo){
    this._patients = foo;
  }
  get patients(){
    return this._patients;
  }

  set patientsIds(foo){
    this._patientsIds = foo;
  }
  get patientsIds(){
    return this._patientsIds;
  }

  set week(foo){
    this._week = foo;
  }
  get week(){
    return this._week;
  }

  set weekHeight(foo){
    this._css.week.height = foo;
  }
  get weekHeight(){
    return this._css.week.height;
  }

  set weekWidth(foo){
    this._css.week.width = foo;
  }
  get weekWidth(){
    return this._css.week.width;
  }

  set weekHeightStep(foo){
    this._css.week.heightStep = foo;
  }
  get weekHeightStep(){
    return this._css.week.heightStep;
  }

  set weekWidthStep(foo){
    this._css.week.widthStep = foo;
  }
  get weekWidthStep(){
    return this._css.week.widthStep;
  }

  /* Définition des méthodes */

  // Procédure qui ajoute un patient à un certain jours, lorsqu'il y a encore de la place (limité par numberOfRoom)
  // patient is Patient Object
  // day is String
  add(patient, day){
    if (this._patients.has(day)){
      if(this._patients.get(day).length < this._numberOfRoom){
        this._patients.set(day, this._patients.get(day).concat([patient]));
      }
    } else{
      this._patients.set(day, Array(patient));
    }
    this._patientsIds.set(patient.id, patient);
    stackTable.updateDisplayDay($('#datepicker').val()); // on actualise l'affichage dela stackTable
  }

  // Procédure qui retire un patient à un certain jour
  // patient is Patient Object
  // day is String
  remove(patient, day){
    var index = this._patients.get(day).indexOf(patient);
    this._patients.get(day).splice(index, 1);
    this._patients.set(day, this._patients.get(day));
  }

  // procédure qui crée et stylise les objets html associés aux patients, ainsi que leurs comportements, en mode Week
  // day is String
  initDisplayWeek(day){
    initStackTableStyleWeek(this, day);
  }

  // procédure qui met à jour les objets html associés aux patients, en mode Week
  updateDisplayWeek(){
    updateStackTableStyleWeek(this);
  }

  // procédure qui crée et stylise les objets html associés aux patients, ainsi que leurs comportements, en mode Week.
  // day is String
  // listOfRooms id Array contenant des Room Object
  initDisplayDay(day, listOfRooms){
    initStackTableStyleDay(this, day);
  }

  // procédure qui crée et stylise les objets html associés aux patients, ainsi que leurs comportements, en mode Week
  // day is String
  updateDisplayDay(day){
    updateStackTableStyleDay(this, day);
  }

}

/* -----------------------------------------------------------------------------
-------------------Definition du comportement en mode Week----------------------
------------------------------------------------------------------------------*/

// Procédure qui crée et stylise les jours, et les objets html associés aux patients, ainsi que leurs comportements, en mode Week
// stackTable is StackTable Object
// day is String
var initStackTableStyleWeek = function(stackTable, day){

  stackTable.week = getWeekOutOfDay(day);

  $('#mainBox').append('<div class="day dark" id="day0"></div>');
  $('#mainBox').append('<div class="day clear" id="day1"></div>');
  $('#mainBox').append('<div class="day dark" id="day2"></div>');
  $('#mainBox').append('<div class="day clear" id="day3"></div>');
  $('#mainBox').append('<div class="day dark" id="day4"></div>');
  $('#mainBox').append('<div class="day clear" id="day5"></div>');
  $('#mainBox').append('<div class="day dark" id="day6"></div>');

  ['LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI','DIMANCHE'].forEach(function(str, index){
    if (index == (dayToDate(day).getDay()+6)%7){
      $('#mainLabelTop').append('<div class="mainLabelTopCell" style="background-color:rgba(204, 86, 71, 0.3)">'+ str +'</div>');
    } else{
      $('#mainLabelTop').append('<div class="mainLabelTopCell">'+ str +'</div>');
    }
  })

  $('#mainLabelTop').children().css('color', 'white');

  initMainBoxLines(stackTable.numberOfRoom);


  // On remplit la stackTable de divs vides, pour pouvoir drop les jquery-sortables sur toute la stackTable
  for (i=0; i<7; i++){
    $('#day'+ i ).append('<ul class="stackableContainer notFull" id="stackableContainer'+i+'"></ul>')
    for (j=0; j<stackTable.numberOfRoom; j++){
      $('#stackableContainer'+i).append('<li class="emptyStackable"> </li>')
    }
  }

  $('.day').on('dblclick', dblclickOnDay);

  $('.emptyStackable').css('height', stackTable.weekHeight/stackTable.weekHeightStep);
  $('.emptyStackable').css('width', stackTable.weekWidth/stackTable.weekWidthStep);

  $('.stackable').css('height', stackTable.weekHeight/stackTable.weekHeightStep);
  $('.stackable').css('width', stackTable.weekWidth/stackTable.weekWidthStep);

  $('.stackableContainer').sortable({
    connectWith: '.notFull',
    cancel: '.emptyStackable',
    tolerance: 'pointer',
    receive: stackableContainerReceive,
    remove: stackableContainerRemove,
    containment: '#mainBox',
  })

  stackTable.week.forEach(function(day, index){
    if (stackTable.patients.has(day)){
      stackTable.patients.get(day).forEach(function(patient){
        $('#day'+index).find('.emptyStackable:first').attr('id', 'stackable' + patient.id);
        $('#stackable' + patient.id).addClass('stackable');
        $('#stackable' + patient.id).removeClass('emptyStackable');
        $('#stackable' + patient.id).css('background-color', patient.color);
        $('#stackable' + patient.id).append(patient.name + ' ' + patient.surname);
      });
    }

  });

  updateStackTableStyleWeek(stackTable, day);

}

// procédure qui met à jour la stackTable, en mode Week
var updateStackTableStyleWeek = function(stackTable){
  updateMainBoxStyle(stackTable.weekWidthStep, stackTable.weekHeightStep);

  stackTable.weekHeight = $('#mainBox').height();
  stackTable.weekWidth = $('#mainBox').width();

  updateMainBoxLines(stackTable.numberOfRoom);

  $('.emptyStackable').css('height', stackTable.weekHeight/stackTable.weekHeightStep);
  $('.emptyStackable').css('width', stackTable.weekWidth/stackTable.weekWidthStep);

}

// Procédure qui met à jour le css des élements représentnt les patients.
var updateStackableStyleWeek = function(){
  $('.stackable').css('height', stackTable.WeekPixelHeight/stackTable.numberOfRoom);
  $('.stackable').css('width', stackTable.WeekPixelWidth/7 );
  $('.emptyStackable').css('height', stackTable.weekHeight/stackTable.weekHeightStep);
  $('.emptyStackable').css('width', stackTable.weekWidth/stackTable.weekWidthStep);
  $( ".stackableContainer" ).sortable( "option", "connectWith", ".notFull" );

}

// Procédure qui se déclenche lorsqu'on double clique sur la stackTable, ajoute un patient au jour sur lequel on a cliqué.
var dblclickOnDay = function(){

  name = prompt("Please enter your name");
  surname = prompt("Please enter your surname");
  patient = new Patient(name, surname);
  day = stackTable.week[this.id[3]];



  $(this).find('.emptyStackable:first').attr('id', 'stackable' + patient.id);
  $('#stackable' + patient.id).addClass('stackable');
  $('#stackable' + patient.id).removeClass('emptyStackable');
  $('#stackable' + patient.id).css('background-color', patient.color);
  $('#stackable' + patient.id).append(patient.name + ' ' + patient.surname);
  stackTable.add(patient, day);
  if(stackTable.patients.get(day).length >= stackTable.numberOfRoom){
    $(this).find('.stackableContainer').removeClass('notFull');
  }
  updateStackableStyleWeek();
}

// Procédure qui se déclenche lorsqu'un jour recoit un patient
var stackableContainerReceive = function(e, ui){

  day = stackTable.week[this.id.substring(18)];
  idPatient = ui.item.attr('id').substring(9);
  patient = stackTable.patientsIds.get(idPatient);

  stackTable.add(patient, day);

  $(this).find('.emptyStackable:first').remove();
  if(stackTable.patients.get(day).length >= stackTable.numberOfRoom){
    $(this).removeClass('notFull');
  }


}

// Procédure qui se déclenche lorsqu'un patient quitte un jour
var stackableContainerRemove = function(e,ui){

  day = stackTable.week[this.id.substring(18)];
  idPatient = ui.item.attr('id').substring(9);
  patient = stackTable.patientsIds.get(idPatient);

  stackTable.remove(patient, day);

  $(this).append('<li class="emptyStackable"></li>');
  $(this).addClass('notFull');
  updateStackableStyleWeek();
}

/* -----------------------------------------------------------------------------
-------------------Definition du comportement en mode Day-----------------------
------------------------------------------------------------------------------*/

// Procédure qui initialise l'affichage en mode Day
// stackTable is StackTable Object
// day is String
var initStackTableStyleDay = function(stackTable, day){

  initSecondaryBoxStyle();

  $('#secondaryBox').append('<ul id="depile"></ul>');
  $('#depile').css('height', '100%');
  $('#depile').css('margin', 0);
  $('#depile').css('padding', 0);
  $('#depile').css('list-style-type', 'none');
  $('#depile').css('overflow-x', 'scroll');

  $('#depile').sortable();

}

// Procédure qui met à jour l'affichage en mode Day
// stackTable is StackTable Object
// day is String
var updateStackTableStyleDay = function(stackTable, day){
  $('#depile').html('');
  if(stackTable.patients.has(day)){
    stackTable.patients.get(day).forEach(function(patient){
      $('#depile').append('<li id="depile' +patient.id+'" style="background-color:'+patient.color+'"> '+patient.name+ '<br>' +patient.surname+'</li>')
    });
  };

  $('#depile').children().css('height', $('#secondaryBox').height());
  $('#depile').children().css('width', $('#secondaryBox').width()/10);
  $('#depile').children().css('display', 'inline');
  $('#depile').children().css('float', 'left');

}
