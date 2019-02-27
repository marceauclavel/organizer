// Classe représentant un créneau horaire, qui sera associé à un objet TimeTable
class Slot{

  // timeTable is TimeTable Object
  // patient is Patient Object
  // startDate is Date Object
  // endDate is Date Object
  // id is String
  constructor(timeTable, patient, startDate, endDate, id){

    this._patient = patient;
    this.timeTable = timeTable;
    this._startDate = startDate;
    this._endDate = endDate;
    this._duration = (endDate - startDate) / 60000; // la durée du slot, en minutes
    this._id = id;
    this._day = dateToDay(this.startDate);

    this._css = {
      id: 'slot'+ id,
      week: {
        minimalHeight: new Number(),
        height: new Number(),
        width: new Number(),
        top: new Number(),
        left: new Number(),
      },
      day: {
        minimalWidth: new Number(),
        width: new Number(),
        top: new Number(),
        left: new Number(),
      }
    }

    /* on associe les méthodes à l'objet */

    this.update = this.update.bind(this);
  }

  /* Définition des accesseurs et des mutateurs */

  get patient(){
    return this._patient;
  }
  set patient(foo){
    this._patient = foo;
  }

  get timeTable(){
    return this._timeTable;
  }
  set timeTable(foo){
    this._timeTable = foo;
  }

  get startDate(){
    return this._startDate;
  }
  set startDate(foo){
    this._startDate = foo;
  }

  get endDate(){
    return this._endDate;
  }
  set endDate(foo){
    this._endDate = foo;
  }

  get duration(){
    return this._duration;
  }
  set duration(foo){
    this._duration = foo;
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

  get dayHeight(){
    return this._css.day.height;
  }
  set dayHeight(foo){
    this._css.day.height = foo;
  }

  get dayWidth(){
    return this._css.day.width;
  }
  set dayWidth(foo){
    this._css.day.width = foo;
  }

  get weekMinimalHeight(){
    return this._css.week.minimalHeight;
  }
  set weekMinimalHeight(foo){
    this._css.week.minimalHeight = foo;
  }

  get DayMinimalWidth(){
    return this._css.day.minimalWidth;
  }
  set DayMinimalWidth(foo){
    this._css.day.minimalWidth = foo;
  }

  get day(){
    return this._day;
  }
  set day(foo){
    this._day = foo;
  }

  get id(){
    return this._id;
  }

  get cssId(){
    return this._css.id;
  }

  /* Définition des méthodes */

  // Procédure permettant de modifier un attribut css de l'élément html associé au créneau
  // attr is String
  // newValue is String
  css(attr, newValue){
    $('#'+this.cssId).css(attr, newValue);
  }

  // Procédure qui initialise, lorsqu'on affiche en mode Week, les éléments html, css correspondant au créneau, ainsi que ses comportements
  initDisplayWeek(){
    initSlotStyleWeek(this, this.timeTable);
  }
  // Procédure qui met à jour, lorsqu'on affiche en mode Week, les éléments html, css correspondant au créneau, ainsi que ses comportements lors d'un changement de la taille dela fenêtre
  updateDisplayWeek(){
    updateSlotStyleWeek(this, this.timeTable);
  }

  // Procédure qui met à jour les attributs de l'objet Slot, suite à une modification manuelle (resize, drag, drop) de l'élément html
  update(){
    updateSlot(this, this.timeTable);
  }

  // Procédure qui initialise, lorsqu'on affiche en mode Line, les éléments html, css correspondant au créneau, ainsi que ses comportements
  initDisplayLine(){
    initSlotStyleLine(this, this.timeTable);
  }

  // Procédure qui met à jour, lorsqu'on affiche en mode Line, les éléments html, css correspondant au créneau, ainsi que ses comportements lors d'un changement de la taille dela fenêtre
  updateDisplayLine(){
    updateSlotStyleLine(this, this.timeTable);

  }



}

/* -----------------------------------------------------------------------------
-------------Definition du comportement des Slots en mode Week------------------
------------------------------------------------------------------------------*/

// Procédure qui met à jour les attributs de l'objet Slot, suite à une
// modification manuelle (resize, drag, drop) de l'élément html.
// slot is Slot Object
// timeTable is TimeTable Object
var updateSlot = function(slot, timeTable){

  day = timeTable.week[ Math.round(7 * $('#'+slot.cssId).position().left / timeTable.weekWidth)];
  slot.day = day;
  date = dayToDate(day);
  slot.startDate = new Date(day.split('/')[2],  day.split('/')[1]-1, day.split('/')[0], 0, timeTable.weekPixelToMinute($('#'+slot.cssId).position().top)+ 60*timeTableStartsAt);
  slot.endDate = new Date(day.split('/')[2],  day.split('/')[1]-1, day.split('/')[0], 0, timeTable.weekPixelToMinute($('#'+slot.cssId).position().top + $('#'+slot.cssId).height()) + 60*timeTableStartsAt);
  slot.duration = (slot.endDate - slot.startDate) / 60000; // la durée du slot, en minutes
}

// Procédure qui met à jour, lorsqu'on affiche en mode Week, les éléments html,
// css correspondant au créneau, ainsi que ses comportements lors d'un changement de la taille dela fenêtre.
// slot is Slot Object
// timeTable is TimeTable Object
var initSlotStyleWeek = function(slot, timeTable){

  // Création des elements html du créneau
  // chaque slot contient
  // - une handleTop pour redimensionner par le haut
  // - une handleBottom pour redimensionner par le bas
  // - une handle qui fait office de poignée pour déplacer le créneau

  $('#mainBox').append('<div id="'+ slot.cssId +'"></div>');
  $('#'+slot.cssId).addClass('slotWeek');
  $('#'+slot.cssId).append('<div class="handleTop" id="handleTop'+slot.id+'"></div>');
  $('#'+slot.cssId).append('<div class="handle" id="handle'+slot.id+'"></div>');
  $('#'+slot.cssId).append('<div class="handleBottom id="handleBottom'+slot.id+'""></div>');

  $('#'+slot.cssId).find('.handleTop').css('background-color', 'rgba(255, 255, 255, 0.1)');
  $('#'+slot.cssId).find('.handleBottom').css('background-color', 'rgba(255, 255, 255, 0.1)');

  $('#' + slot.cssId ).draggable({

    grid: timeTable.grid,
    handle: '#'+$('#' + slot.cssId ).find('.handle').attr('id'),
    containment: 'parent',
    start: function(){ $('#mainBox').css('cursor', 'move')},
    stop: function(){
      $('#mainBox').css('cursor', 'default');
      slot.update();
    },
  });

  // Initialisation du css du créneau

  slot.css('position', 'absolute');
  slot.css('background-color', slot.patient.color);

  $('#'+slot.cssId).find('.handleTop').css('height', resizerHeight);
  $('#'+slot.cssId).find('.handleBottom').css('height', resizerHeight);

  $('#'+slot.cssId).find('.handleTop').mousedown(HTMousedown);
  $('#'+slot.cssId).find('.handleBottom').mousedown(HBMousedown);

  // procédure qui définit le comportement du redimensionnement par le haut lorsqu'on clique sur la handleTop
  function HTMousedown(e){
    console.log('TopPressed');
    $('#mainBox').css('cursor', 'row-resize');
    currentSlot = this.closest('.slotWeek');
    slot = timeTable.slotsIds.get(currentSlot.id.substring(4));
    initSlotHeight = $(currentSlot).height();
    initMouseY = (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop));
    resizingTop = true;
    resizingBottom = false;
    initSlotTop = $(currentSlot).position().top;
    initSlotOffsetTop = $(currentSlot).offset().top;
    $('#container').mousemove(documentMousemove);
    $('#container').mouseup(documentMouseup);
  }

  // procédure qui définit le comportement du redimensionnement par le haut lorsqu'on clique sur la handleTop
  function HBMousedown(e){
    console.log('BottomPressed');
    $('#mainBox').css('cursor', 'row-resize')
    currentSlot = this.closest('.slotWeek');
    var slot = timeTable.slotsIds.get(currentSlot.id.substring(4));
    initSlotTop = $(currentSlot).position().top;
    initSlotOffsetTop = $(currentSlot).offset().top;
    initSlotHeight = $(currentSlot).height();
    resizingBottom = true;
    resizingTop = false;
    $('#container').mousemove(documentMousemove);
    $('#container').mouseup(documentMouseup);
  }

  // procédure qui gère le redimensionnement en temps réel, lorsque la souris bouge et qu'on maintient appuyé
  function documentMousemove(e){
    if(resizingTop){
      containment = $('#mainBox');
      minHeight = slot.weekMinimalHeight;
      maxHeight = initSlotHeight + initSlotTop;
      minTop = 0;
      maxTop = maxHeight - slot.weekMinimalHeight;
      $(currentSlot).css('top', Math.max(Math.min((e.clientY + (document.body.scrollTop || document.documentElement.scrollTop)) - containment.offset().top, maxTop), minTop));
      $(currentSlot).css('height', Math.min(Math.max(initSlotHeight + initSlotOffsetTop - (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop)), minHeight),maxHeight) );
      $(currentSlot).find('.handle').css('height',$(currentSlot).height() - 2*resizerHeight );
    }
    if(resizingBottom){
      containment = $('#mainBox');
      minHeight = slot.weekMinimalHeight;
      maxHeight = timeTable.weekHeight - initSlotTop;
      $(currentSlot).css('height', Math.min(Math.max(minHeight, (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop)) - initSlotOffsetTop ), maxHeight));
      $(currentSlot).find('.handle').css('height',$(currentSlot).height() - 2*resizerHeight );
    }
  }

  // procédure qui gère l'arrêt du redimentionnement, lorsqu'on arrête d'appuyer sur la souris
  // le créneau redimensionné s'adapte automatiquement à la grille définie par le temps minimal
  // de rendez vous (la durée, et le début d'un créneau seront multiples de minimalSlotHeight définit dans settings.js)
  function documentMouseup(e){

    if(resizingTop){
      containment.css('cursor','default');
      resizingTop = false;
      clientY = (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop));
      minTop = 0;
      maxTop = initSlotTop + initSlotHeight - slot.weekMinimalHeight;
      minHeight = slot.weekMinimalHeight;
      maxHeight = initSlotHeight + initSlotTop;
      $(currentSlot).css('top', closestAvailable(slot.weekMinimalHeight, Math.max(Math.min(clientY - containment.offset().top, maxTop), minTop)));
      $(currentSlot).css('height', closestAvailable(slot.weekMinimalHeight, Math.min(Math.max(initSlotHeight + initSlotOffsetTop - clientY, minHeight),maxHeight) ));
    }
    if(resizingBottom){
      containment.css('cursor','default');
      resizingBottom = false;
      minHeight = slot.weekMinimalHeight;
      maxHeight = timeTable.weekHeight - initSlotTop;
      $(currentSlot).css('height', closestAvailable(slot.weekMinimalHeight, Math.min(Math.max(minHeight, (e.clientY + (document.body.scrollTop || document.documentElement.scrollTop)) - initSlotOffsetTop ), maxHeight)));
    }
    $(currentSlot).find('.handle').css('height',$(currentSlot).height() - 2*resizerHeight );
    timeTable.slotsIds.get(currentSlot.id.substring(4)).update(); // on met à jour la valeur des arguments de l'objet javascript correspondant

  }

}

// Procédure qui met à jour la taille du créneau, suite à un redimensionnement de la taille de la fenêtre.
// slot in Slot Object
// timeTable is TimeTable Object
var updateSlotStyleWeek = function(slot, timeTable){

  $('#' + slot.cssId ).draggable( "option", "grid", timeTable.weekGrid );

  slot.weekMinimalHeight = timeTable.weekHeight * (minimunSlotTime/((timeTableEndsAt-timeTableStartsAt)*60));

  slot.weekHeight = closestAvailable(slot.weekMinimalHeight,timeTable.weekMinuteToPixel(slot.duration));
  slot.weekWidth = timeTable.weekWidth/7 ;

  slot.css('height', slot.weekHeight);
  slot.css('width', slot.weekWidth);
  slot.css('top', closestAvailable(slot.weekMinimalHeight,timeTable.weekMinuteToPixel(slot.startDate.getMinutes() + 60*slot.startDate.getHours() - 60*timeTableStartsAt)) );
  slot.css('left', ((slot.startDate.getDay()+6) % 7) * ($('#mainBox').width()/7) );

  $('#'+slot.cssId).find('.handle').css('height', $('#'+slot.cssId).height() - 2*resizerHeight);


}

/* ----------------------------------------------------------------------------- Non utilisé pour l'instant
-------------Definition du comportement des Slots en mode Line------------------ Sera utile lors de l'implémentation du dépilement
------------------------------------------------------------------------------*/

var initSlotStyleLine = function(slot, timeTable){

  // Création des elements html
  $('#' + timeTable.lineContainmentId).append('<div id="'+ slot.cssId +'"></div>');
  $('#'+slot.cssId).addClass('slotLine');
  $('#'+slot.cssId).append('<div class="handleLeft" id="handleLeft'+slot.id+'"></div>');
  $('#'+slot.cssId).append('<div class="handle" id="handle'+slot.id+'"></div>');
  $('#'+slot.cssId).append('<div class="handleRight id="handleRight'+slot.id+'""></div>');

  $('#'+slot.cssId).find('.handleLeft').css('background-color', 'blue');
  $('#'+slot.cssId).find('.handleRight').css('background-color', 'blue');
  // $('#'+slot.cssId).find('.handleLeft').css('background-color', 'rgba(255, 255, 255, 0.1)');
  // $('#'+slot.cssId).find('.handleRight').css('background-color', 'rgba(255, 255, 255, 0.1)');


  $('#' + slot.cssId ).draggable({

    grid: timeTable.lineGrid,
    handle: '#'+$('#' + slot.cssId ).find('.handle').attr('id'),
    containment: 'parent',
    start: function(){ $('#mainBox').css('cursor', 'move')},
    stop: function(){
      $('#mainBox').css('cursor', 'default');
      slot.update();
    },
  });

  // Initialisation du css
  console.log(slot);
  slot.css('position', 'absolute');
  slot.css('background-color', slot.patient.color);

  $('#'+slot.cssId).find('.handle').css('position', 'absolute');
  $('#'+slot.cssId).find('.handle').css('height', '100%');


  $('#'+slot.cssId).find('.handleLeft').css('position', 'absolute');
  $('#'+slot.cssId).find('.handleLeft').css('width', resizerWidth);
  $('#'+slot.cssId).find('.handleLeft').css('height', '100%');
  $('#'+slot.cssId).find('.handleLeft').css('left', 0);

  $('#'+slot.cssId).find('.handleRight').css('position', 'absolute');
  $('#'+slot.cssId).find('.handleRight').css('width', resizerWidth);
  $('#'+slot.cssId).find('.handleRight').css('height', '100%');
  $('#'+slot.cssId).find('.handleRight').css('right', 0);

  $('#'+slot.cssId).find('.handleLeft').mousedown(HLMousedown);
  $('#'+slot.cssId).find('.handleRight').mousedown(HRMousedown);

  function HLMousedown(e){
    console.log('LeftPressed');
    $('#mainBox').css('cursor', 'row-resize')
    currentSlot = this.closest('.slotLine');
    slot = timeTable.slotsIds.get(currentSlot.id.substring(4));
    initSlotWidth = $(currentSlot).width();
    initMouseX = (e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft));
    resizingLeft = true;
    resizingRight = false;
    initSlotLeft = $(currentSlot).position().left;
    initSlotOffsetLeft = $(currentSlot).offset().left;
    $(document).on('mousemove',documentMousemove);
    $(document).on('mouseup',documentMouseup);
  }

  function HRMousedown(e){
    console.log('RightPressed');
    $('#mainBox').css('cursor', 'row-resize')
    currentSlot = this.closest('.slotLine');
    slot = timeTable.slotsIds.get(currentSlot.id.substring(4));
    initSlotLeft = $(currentSlot).position().left;
    initSlotOffsetLeft = $(currentSlot).offset().left;
    initSlotWidth = $(currentSlot).width();
    resizingRight = true;
    resizingLeft = false;
    $(document).on('mousemove',documentMousemove);
    $(document).on('mouseup',documentMouseup);
  }

  function documentMousemove(e){
    if(resizingLeft){
      containment = $('#mainBox');
      minWidth = slot.lineMinimalWidth;
      maxWidth = initSlotWidth + initSlotLeft;
      minLeft = 0;
      maxLeft = maxLeft - slot.lineMinimalWidth;
      $(currentSlot).css('left', Math.max(Math.min((e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft)) - containment.offset().left, maxLeft), minLeft));
      $(currentSlot).css('width', Math.min(Math.max(initSlotWidth + initSlotOffsetLeft - (e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft)), minWidth),maxWidth) );
      $(currentSlot).find('.handle').css('width',$(currentSlot).width() - 2*resizerWidth );
    }
    if(resizingBottom){
      containment = $('#mainBox');
      minWidth = slot.lineMinimalWidth;
      maxWidth = timeTable.lineWidth - initSlotLeft;
      $(currentSlot).css('width', Math.min(Math.max(minWidth, (e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft)) - initSlotOffsetLeft ), maxWidth));
      $(currentSlot).find('.handle').css('width',$(currentSlot).width() - 2*resizerWidth );
    }
  }

  function documentMouseup(e){

    if(resizingLeft){
      containment.css('cursor','default');
      resizingLeft = false;
      clientX = (e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft));
      minLeft = 0;
      maxLeft = initSlotLeft + initSlotWidth - slot.lineMinimalWidth;
      minWidth = slot.lineMinimalWidth;
      maxWidth = initSlotWidth + initSlotLeft;
      $(currentSlot).css('left', closestAvailable(slot.lineMinimalWidth, Math.max(Math.min(clientX - containment.offset().left, maxLeft), minLeft)));
      $(currentSlot).css('width', closestAvailable(slot.lineMinimalWidth, Math.min(Math.max(initSlotWidth + initSlotOffsetLeft - clientX, minWidth),maxWidth) ));
    }
    if(resizingRight){
      containment.css('cursor','default');
      resizingRight = false;
      minWidth = slot.lineMinimalWidth;
      maxWidth = timeTable.lineWidth - initSlotLeft;
      $(currentSlot).css('width', closestAvailable(slot.lineMinimalWidth, Math.min(Math.max(minWidth, (e.clientX + (document.body.scrollleft || document.documentElement.scrollLeft)) - initSlotOffsetLeft ), maxWidth)));
    }
    $(currentSlot).find('.handle').css('width',$(currentSlot).width() - 2*resizerWidth );
    slot.update();

  }

}

var updateSlotStyleLine = function(slot, timeTable){

  $('#' + slot.cssId ).draggable( "option", "grid", timeTable.lineGrid );

  slot.lineMinimalWidth = timeTable.lineWidth * (minimunSlotTime/((timeTableEndsAt-timeTableStartsAt)*60));
  slot.lineWidth = timeTable.lineMinuteToPixel(slot.duration);
  slot.lineHeight = timeTable.lineHeight ;

  slot.css('width', slot.lineWidth);
  slot.css('height', slot.lineHeight);
  slot.css('left', closestAvailable(slot.lineMinimalWidth,timeTable.lineMinuteToPixel(slot.startDate.getMinutes() + 60*slot.startDate.getHours() - 60*timeTableStartsAt)) );
  slot.css('background-color', 'red');

  $('#'+slot.cssId).find('.handle').css('width', $('#'+slot.cssId).width() - 2*resizerWidth);

}
