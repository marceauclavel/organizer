// Classe représentant un emploi du temps
class TimeTable{

  constructor(){
    this._slots = new Map();
    this._slotsIds = new Map();
    this._css = {
      week: {
        containmentId: 'mainBox',
        currentWeek: getWeekOutOfDay(dateToDay(new Date())),
        height: $('#mainBox').height(),
        width: $('#mainBox').width(),
        heightStep: (timeTableEndsAt - timeTableStartsAt)*(60/minimunSlotTime),
        widthStep: 7,
        grid: new Array(),
      },
      line: {
        containmentId: 'mainBox',
        currentDay: dateToDay(new Date()),
        height: $('#mainBox').height(),
        width: $('#mainBox').width(),
        heightStep: numberOfRoom,
        widthStep: (timeTableEndsAt - timeTableStartsAt)*(60/minimunSlotTime),
        grid: new Array(),
      },
    }

    /* on associe les méthodes à l'objet */

    this.updateDisplayWeek = this.updateDisplayWeek.bind(this);
  }

  /* Définition des accesseurs et des mutateurs */

  get slots(){
    return this._slots;
  }
  set slots(foo){
    this._slots = foo;
  }

  get slotsIds(){
    return this._slotsIds;
  }

  set weekContainmentId(foo){
    this._css.week.containmentId = foo;
  }
  get weekContainmentId(){
    return this._css.week.containmentId;
  }

  get week(){
    return this._css.week.currentWeek;
  }
  set week(foo){
    this._css.week.currentWeek = foo;
  }

  get weekHeight(){
    return this._css.week.height;
  }
  set weekHeight(foo){
    this._css.week.height = foo;
  }

  get weekWidth(){
    return this._css.week.width;
  }
  set weekWidth(foo){
    this._css.week.width = foo;
  }

  get weekHeightStep(){
    return this._css.week.heightStep;
  }
  set weekHeightStep(foo){
    this._css.week.heightStep = foo;
  }

  get weekWidthStep(){
    return this._css.week.widthStep;
  }
  set weekWidthStep(foo){
    this._css.week.widthStep = foo;
  }

  get weekGrid(){
    return this._css.week.grid;
  }
  set weekGrid(foo){
    this._css.week.grid = foo;
  }

  get day(){
    return this._css.day.currentDay;
  }
  set day(foo){
    this._css.day.currentDay = foo;
  }

  set lineContainmentId(foo){
    this._css.line.containmentId = foo;
  }
  get lineContainmentId(){
    return this._css.line.containmentId;
  }

  get lineHeight(){
    return this._css.line.height;
  }
  set lineHeight(foo){
    this._css.line.height = foo;
  }

  get lineWidth(){
    return this._css.line.width;
  }
  set lineWidth(foo){
    this._css.line.width = foo;
  }

  get lineHeightStep(){
    return this._css.line.heightStep;
  }
  set lineHeightStep(foo){
    this._css.line.heightStep = foo;
  }

  get lineWidthStep(){
    return this._css.line.widthStep;
  }
  set lineWidthStep(foo){
    this._css.line.widthStep = foo;
  }

  get lineGrid(){
    return this._css.line.grid;
  }
  set lineGrid(foo){
    this._css.line.grid = foo;
  }

  /* Définition des méthodes */

  // procédure qui ajoute à l'objet TimeTable un créneau
  // slot is Slot Object
  add(slot){
    var day = slot.day;
    if (this.slots.has(day)){
      var array = this.slots.get(day);
      array.push(slot);
      this.slots.set(day, array);
    } else{
      this.slots.set(day, [slot]);
    }
    this._slotsIds.set(slot.id, slot);

  }

  // procédure qui retire à l'objet TimeTable un créneau
  // slot is Slot Object
  remove(slot){
    day = slot.day;
    var index = this.slots.get(day).indexOf(slot);
    this.slots.get(day).splice(index, 1);
    this.slots.set(day, this.slots.get(day));
  }

  // fonction qui retourne une durée en minutes, correspondant à un nombre de pixels, en fonction de la taille de l'emploi du temps en mode Week
  // pixels is Number
  weekPixelToMinute(pixels){
    return (pixels/this.weekHeight) * (60*timeTableEndsAt-60*timeTableStartsAt);
  }

  // fonction qui retourne un nombre de pixels, correspondant à une durée en minutes, en fonction de la taille de l'emploi du temps en mode Week
  // minutes is Number
  weekMinuteToPixel(minutes){
    return (minutes/(60*timeTableEndsAt-60*timeTableStartsAt)) * this.weekHeight;
  }

  // fonction qui retourne une durée en minutes, correspondant à un nombre de pixels, en fonction de la taille de l'emploi du temps en mode Line
  // pixels is Number
  linePixelToMinute(pixels){
    return (pixels/this.lineWidth) * (60*timeTableEndsAt-60*timeTableStartsAt);
  }

  // fonction qui retourne un nombre de pixels, correspondant à une durée en minutes, en fonction de la taille de l'emploi du temps en mode Line
  // minutes is Number
  lineMinuteToPixel(minutes){
    return (minutes/(60*timeTableEndsAt-60*timeTableStartsAt)) * this.lineWidth;
  }

  // procédure qui initialise les éléments html et css correspondant l'emploi du temps en mode Week
  // day is String
  initDisplayWeek(day){
    initTimeTableStyleWeek(this, day);
  }

  // procédure qui met à jour les éléments html et css correspondant l'emploi du temps en mode Week
  updateDisplayWeek(){
    updateTimeTableStyleWeek(this);
  }

  // procédure qui initialise les éléments html et css correspondant l'emploi du temps en mode Line
  // day is String
  initDisplayLine(day){
    initTimeTableStyleLine(this, day);
  }

  // procédure qui met à jour les éléments html et css correspondant l'emploi du temps en mode Line
  updateDisplayLine(day){
    updateTimeTableStyleLine(this, day);
  }




}

/* -----------------------------------------------------------------------------
------------------Definition du comportement en mode Week-----------------------
------------------------------------------------------------------------------*/

// Procédure qui met à jour les arguments de l'objet javascript après un changement de la taille de la fenêtre
// timeTable is TimeTable Object
updateTimeTableWeek = function(timeTable){
  timeTable.weekHeight = closestAvailable(timeTable.weekHeightStep, $('#'+timeTable.weekContainmentId).height());
  timeTable.weekWidth = closestAvailable(timeTable.weekWidthStep, $('#'+timeTable.weekContainmentId).width());
  timeTable.weekGrid = [timeTable.weekWidth / timeTable.weekWidthStep, timeTable.weekHeight / timeTable.weekHeightStep];

  timeTable.weekPixelToMinute = function(pixels){
    return (pixels/timeTable.weekHeight) * (60*timeTableEndsAt-60*timeTableStartsAt);
  }
  timeTable.weekMinuteToPixel = function(minutes){
    return (minutes/(60*timeTableEndsAt-60*timeTableStartsAt)) * timeTable.weekHeight;
  }

}

// Procédure qui met à jour l'affichage de la timeTable, ainsi que tout son contenu, en fonction de la taille de la fenêtre
// timeTable is TimeTable Object
updateTimeTableStyleWeek = function(timeTable){

  updateMainBoxStyle(timeTable.weekWidthStep, timeTable.weekHeightStep);
  updateMainBoxLines(timeTableEndsAt - timeTableStartsAt);

  updateTimeTableWeek(timeTable);

  timeTable.week.forEach(function(day){
    if (timeTable.slots.has(day)){
      timeTable.slots.get(day).forEach(function(slot){
        slot.updateDisplayWeek();
      })
    }

  })

}

// Procédure qui initialise l'affichage de la timeTable
// timeTable is TimeTable Object
// day is String
initTimeTableStyleWeek = function(timeTable, day){

  timeTable.week = getWeekOutOfDay(day);

  $('#'+timeTable.containmentId).append('<div class="day dark" id="day0"></div>');
  $('#'+timeTable.weekContainmentId).append('<div class="day clear" id="day1"></div>');
  $('#'+timeTable.weekContainmentId).append('<div class="day dark" id="day2"></div>');
  $('#'+timeTable.weekContainmentId).append('<div class="day clear" id="day3"></div>');
  $('#'+timeTable.weekContainmentId).append('<div class="day dark" id="day4"></div>');
  $('#'+timeTable.weekContainmentId).append('<div class="day clear" id="day5"></div>');
  $('#'+timeTable.weekContainmentId).append('<div class="day dark" id="day6"></div>');

  initMainBoxLines(timeTableEndsAt - timeTableStartsAt);

  ['LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI','DIMANCHE'].forEach(function(str, index){
    if (index == (dayToDate(day).getDay()+6)%7){
      $('#mainLabelTop').append('<div class="mainLabelTopCell" style="background-color:rgba(204, 86, 71, 0.3)">'+ str +'</div>');
    } else{
      $('#mainLabelTop').append('<div class="mainLabelTopCell">'+ str +'</div>');
    }

  })


  for (i=timeTableStartsAt; i<= timeTableEndsAt; i++) {
    $('#mainLabelLeft').append('<div class="mainLabelLeftCell">'+i+'</div>');
  }

  $('.mainLabelLeftCell').css('height', 100/(timeTableEndsAt - timeTableStartsAt ) + '%');
  $('.mainLabelLeftCell').css('line-height', timeTableEndsAt - timeTableStartsAt  + '%');


  timeTable.week.forEach(function(day){
    if (timeTable.slots.has(day)){
      timeTable.slots.get(day).forEach(function(slot){
        slot.initDisplayWeek();
      })
    }

  })

}

/* ----------------------------------------------------------------------------- Non utilisé pour l'instant,
------------------Definition du comportement en mode Line----------------------- Sera utilisé lors de l'implémentation du dépilement
------------------------------------------------------------------------------*/

// Procédure qui met à jour les arguments de l'objet javascript après un changement de la taille de la fenêtre en mode Line
// timeTable is TimeTable Object
updateTimeTableLine = function(timeTable){

  timeTable.lineHeight = closestAvailable(timeTable.lineHeightStep, $('#'+timeTable.lineContainmentId).height());
  timeTable.lineWidth = closestAvailable(timeTable.lineWidthStep, $('#'+timeTable.lineContainmentId).width());
  timeTable.lineGrid = [timeTable.lineWidth / timeTable.lineWidthStep, timeTable.lineHeight];

  timeTable.linePixelToMinute = function(pixels){
    return (pixels/timeTable.lineWidth) * (60*timeTableEndsAt-60*timeTableStartsAt);
  }
  timeTable.lineMinuteToPixel = function(minutes){
    return (minutes/(60*timeTableEndsAt-60*timeTableStartsAt)) * timeTable.lineWidth;
  }

}

// Procédure qui met à jour le style après un changement de la taille de la fenêtre en mode Line
// timeTable is TimeTable Object
updateTimeTableStyleLine = function(timeTable){

  updateMainBoxStyle(timeTable.lineWidthStep, timeTable.lineHeightStep);
  updateMainBoxLines(timeTableEndsAt - timeTableStartsAt);

  updateTimeTableLine(timeTable);

  timeTable.week.forEach(function(day){
    if (timeTable.slots.has(day)){
      timeTable.slots.get(day).forEach(function(slot){
        slot.updateDisplayLine();
      })
    }

  })

}

// Procédure qui initialise le style après un changement de la taille de la fenêtre en mode Line
// timeTable is TimeTable Object
initTimeTableStyleLine = function(timeTable, day){

  timeTable.week = getWeekOutOfDay(day);

  $('#'+timeTable.lineContainmentId).append('<div class="day dark" id="day0"></div>');
  $('#'+timeTable.lineContainmentId).append('<div class="day clear" id="day1"></div>');
  $('#'+timeTable.lineContainmentId).append('<div class="day dark" id="day2"></div>');
  $('#'+timeTable.lineContainmentId).append('<div class="day clear" id="day3"></div>');
  $('#'+timeTable.lineContainmentId).append('<div class="day dark" id="day4"></div>');
  $('#'+timeTable.lineContainmentId).append('<div class="day clear" id="day5"></div>');
  $('#'+timeTable.lineContainmentId).append('<div class="day dark" id="day6"></div>');


  timeTable.week.forEach(function(day){
    if (timeTable.slots.has(day)){
      timeTable.slots.get(day).forEach(function(slot){
        console.log(slot);
        slot.initDisplayLine();
      })
    }

  })

}
