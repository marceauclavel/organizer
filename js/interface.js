/* -----------------------------------------------------------------------------
---------------------Style des éléments html conteneurs-------------------------
------------------------------------------------------------------------------*/

// Procédure qui réinitialise l'interface
var resetInterface = function(){
  $('#container').html('<div id="settingBar"></div><div id="mainBox"></div><div id="mainLabelTop"></div><div id="mainLabelLeft"></div><div id="secondaryBox"></div><div id="secondaryLabelTop"></div><div id="secondaryLabelLeft"></div>')
  $('#container').off();
  initSettingBarStyle();
  initMainBoxStyle();

};

// Procédure retirant le contenu html de la mainBox
var resetMainBox = function(){
  $('#mainBox').html('');
  $('#mainLabelTop').html('');
  $('#mainLabelLeft').html('');
}

// Procédure initialisant le css de la mainBox, et de ses labels
var initMainBoxStyle = function(){
  $('#mainBox').css('width', 100*relativeMainBoxWidth + '%');
  $('#mainBox').css('height', 100*relativeMainBoxHeight + '%');
  $('#mainBox').css('left', 100*relativeMainBoxLeft + '%');
  $('#mainBox').css('top', 100*relativeMainBoxTop + '%');

  $('#mainLabelTop').css('top', 100*(relativeMainBoxTop-0.03) + '%');
  $('#mainLabelTop').css('left', 100*(relativeMainBoxLeft) + '%');
  $('#mainLabelTop').css('width', 100*(relativeMainBoxWidth) + '%');

  $('#mainLabelLeft').css('top',100*relativeMainBoxTop + '%');
  $('#mainLabelLeft').css('height', 100*relativeMainBoxHeight + '%');
  $('#mainLabelLeft').css('left', 100*(relativeMainBoxLeft-0.02) + '%');
}

// Procédure qui met à jour la style de la mainBox,
// La mainBox a une largeur multiple de widthStep, et une hauteur multiple de heightStep.
// widthStep is Number
// heightStep is Number
var updateMainBoxStyle = function(widthStep, heightStep){
  $('#mainBox').css('width', closestAvailable(widthStep, $('#container').width()*relativeMainBoxWidth) );
  $('#mainBox').css('height', closestAvailable(heightStep, $('#container').height()*relativeMainBoxHeight) );
  $('#mainLabelTop').css('width', closestAvailable(widthStep, $('#container').width()*relativeMainBoxWidth) );
  $('#mainLabelLeft').css('height', closestAvailable(heightStep, $('#container').height()*relativeMainBoxHeight) );
}

// Procédure qui initialise le html et le style de la settingbar
var initSettingBarStyle = function(){
  $('#settingBar').css('height', 100*relativeSettingBarHeight + '%');
  $('#settingBar').css('width', 100*relativeSettingBarWidth + '%');
  $('#settingBar').css('top', 100*relativeSettingBarTop + '%');
  $('#settingBar').css('left', 100*relativeSettingBarLeft + '%');
  $('#settingBar').append("<fieldset id='whichMode'></fieldset>");
  $('#whichMode').append('<legend>Select a Mode: </legend>');
  $('#whichMode').append('<label for="empileButton">Empile</label>');
  $('#whichMode').append('<input type="radio" name="radio" id="empileButton">');
  $('#whichMode').append('<label for="depileButton"> &nbsp Depile</label>');
  $('#whichMode').append('<input type="radio" name="radio" id="depileButton">');
  $('#whichMode').append('<label for="tileTableButton"> &nbsp TimeTable</label>');
  $('#whichMode').append('<input type="radio" name="radio" id="timeTableButton">');

  $('#whichMode input[name="radio"]').click(function(){
    if($('input:radio[name="radio"]:checked').attr('id') == 'timeTableButton'){
      timeTableMode();
    } else if($('input:radio[name="radio"]:checked').attr('id') == 'empileButton'){
      empileMode();
    } else if($('input:radio[name="radio"]:checked').attr('id') == 'depileButton'){
      depileMode();
    }

  });

}

// Procédure qui crée des lignes horizontales dans la mainBox, régulièrement espacées.
// nbLines is Number et représente le nombre de lignes
var initMainBoxLines = function(nbLines){
  for (i=1; i<= nbLines; i++) {
    $('#mainBox').append('<div id="line'+i+'" class="line"></div>');
  }
  $('.line').css('margin-top', ($('#mainBox').height()/nbLines)-1);
  $('#line1').css('margin-top', ($('#mainBox').height()/nbLines));
}

// Procédure qui met à jour les lignes horizontales dans la mainBox, lorsque la taille de la mainBox change.
// nbLines is Number et représente le nombre de lignes
var updateMainBoxLines = function(nbLines){
  $('.line').css('margin-top', ($('#mainBox').height()/nbLines)-1);
  $('#line1').css('margin-top', ($('#mainBox').height()/nbLines));
}

// Procédure initialisant le css de la secondaryBox, et de ses labels
var initSecondaryBoxStyle = function(){
  $('#secondaryBox').css('width', 100*relativeSecondaryBoxWidth + '%');
  $('#secondaryBox').css('height', 100*relativeSecondaryBoxHeight + '%');
  $('#secondaryBox').css('left', 100*relativeSecondaryBoxLeft + '%');
  $('#secondaryBox').css('top', 100*relativeSecondaryBoxTop + '%');
  $('#secondaryBox').css('background-color', '#A9A9A9');

  $('#secondaryLabelLeft').css('top', 100*relativeSecondaryBoxTop + '%');
  $('#secondaryLabelLeft').css('height', 100*relativeSecondaryBoxHeight + '%');
  $('#secondaryLabelLeft').css('left', 100*(relativeSecondaryBoxLeft -0.05 )+ '%');

  $('#secondaryLabelTop').css('top', 100*(relativeSecondaryBoxTop-0.02) + '%');
  $('#secondaryLabelTop').css('width', 100*relativeSecondaryBoxWidth + '%');
  $('#secondaryLabelTop').css('left', 100*relativeSecondaryBoxLeft+ '%');
}

/* -----------------------------------------------------------------------------
------------------Comportement des éléments de la settingBar--------------------
------------------------------------------------------------------------------*/

// Procédure executée lorsqu'on entre dans le mode timeTableMode
var timeTableMode = function(){
  resetInterface();

  doctor.timeTable.initDisplayWeek(dateToDay(new Date()));
  doctor.timeTable.updateDisplayWeek(dateToDay(new Date()));

  document.addEventListener("fullscreenchange", doctor.timeTable.updateDisplayWeek );
  $(window).resize(doctor.timeTable.updateDisplayWeek);

  $('#settingBar').append('<input value="'+dateToDay(new Date())+'" type="text" id="datepicker">');

  initDatepicker();

  $("#datepicker").change(function(){
    resetMainBox();
    doctor.timeTable.initDisplayWeek($('#datepicker').val());
    doctor.timeTable.updateDisplayWeek($('#datepicker').val());
  });
}

// Procédure executée lorsqu'on entre dans le mode empileMode
var empileMode = function(){
  resetInterface();

  stackTable.initDisplayWeek(dateToDay(new Date()));
  stackTable.updateDisplayDay(dateToDay(new Date()));

  $('#settingBar').append('<input value="'+dateToDay(new Date())+'" type="text" id="datepicker">');

  document.addEventListener("fullscreenchange", stackTable.updateDisplayWeek );
  $(window).resize(stackTable.updateDisplayWeek);

  initDatepicker();

  $("#datepicker").change(function(){
    resetMainBox();
    stackTable.initDisplayWeek($('#datepicker').val());
    stackTable.updateDisplayWeek($('#datepicker').val());
  });
}

// Procédure executée lorsqu'on entre dans le mode depileMode
var depileMode = function(){
  resetInterface();

  stackTable.initDisplayDay(dateToDay(new Date()));
  stackTable.updateDisplayDay(dateToDay(new Date()));

  // listOfRooms= [];
  //
  // listOfRoomsId.forEach(function(roomId){
  //   listOfRooms.push(new Room(roomId));
  // })
  //
  //
  // initRoomCssBoxes(listOfRooms, dateToDay(new Date()));
  //
  // testRoom = listOfRooms[0];
  //
  // startDateTest = new Date(2018, 06, 26, 8);
  // endDateTest = new Date(2018, 06, 26, 12),
  // slotTest = new Slot(testRoom.timeTable, new Patient('david', 'Rectangle'), startDateTest, endDateTest, 'teeest' );
  //
  // testRoom.addSlot(slotTest);
  // listOfRooms[0] = testRoom;
  //
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">LUNDI</div>');
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">MARDI</div>');
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">MERCREDI</div>');
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">JEUDI</div>');
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">VENDREDI</div>');
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">SAMEDI</div>');
  // $('#mainLabelTop').append('<div class="mainLabelTopCell">DIMANCHE</div>');
  //
  // listOfRooms.forEach(function(room){
  //   console.log(room.timeTable.lineContainmentId);
  //   room.timeTable.initDisplayLine(dateToDay(new Date()));
  //   room.timeTable.updateDisplayLine(dateToDay(new Date()));
  // })

  $('#settingBar').append('<input value="'+dateToDay(new Date())+'" type="text" id="datepicker">');

  initDatepicker();

  $("#datepicker").change(function(){
    resetMainBox();
    stackTable.initDisplayDay($('#datepicker').val());
    stackTable.updateDisplayDay($('#datepicker').val());
  });

}

// Procédure qui initialise le datePicker, en francais
var initDatepicker = function(){
  $( "#datepicker" ).datepicker({
    altField: "#datepicker",
    closeText: 'Fermer',
    prevText: 'Précédent',
    nextText: 'Suivant',
    currentText: 'Aujourd\'hui',
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekHeader: 'Sem.',
    firstDay: 1,
    dateFormat: 'd/m/yy',
  });

  $('#datepicker').val()

}

// Ce qui suit est exécuté au lancement du programme
$(function(){

  $('#container').css('height', 100* relativeContainerHeight + '%');
  $('#container').css('width', 100* relativeContainerWidth + '%');

  resetInterface();

});
