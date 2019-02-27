// Code executé après le chargement de tous les éléments,
// On initialise ici les objets

$(function(){

  doctor = new Doctor('Sigmund', 'Freud');
  patient = new Patient('Michael', 'Pinson');

  startDate1 = new Date(2018, 06, 24, 16, 00);
  endDate1 = new Date(2018, 06, 24, 17, 30);

  startDate2 = new Date(2018, 06, 26, 8);
  endDate2 = new Date(2018, 06, 26, 9);

  startDate3 = new Date();
  endDate3 = new Date(2018, 06, 27, 17) ;

  startDate4 = new Date(2018, 06, 20, 13);
  endDate4 = new Date(2018, 06, 20, 16);

  slot1 = new Slot(doctor.timeTable, patient, startDate1, endDate1, '1276');
  slot2 = new Slot(doctor.timeTable, patient, startDate2, endDate2, '1277');
  slot3 = new Slot(doctor.timeTable, patient, startDate3, endDate3, '1278');
  slot4 = new Slot(doctor.timeTable, patient, startDate4, endDate4, '1279');

  doctor.addSlot(slot1);
  doctor.addSlot(slot2);
  doctor.addSlot(slot3);
  doctor.addSlot(slot4);

  console.log(doctor.timeTable.slots);

  stackTable = new StackTable(numberOfRoom);

});
