// Classe représentant un docteur

class Doctor{

  // name is String
  // surname is String
  constructor(name, surname){
    this._name = name;
    this._surname = surname;
    this._timeTable = new TimeTable();
    this._slots = this._timeTable.slots;
  }

  /* Définition des accesseurs et des mutateurs */

  get name(){
    return this._name;
  }
  set name(foo){
    this._name = foo;
  }

  get surname(){
    return this._surname;
  }
  set surname(foo){
    this._surname = foo;
  }

  get timeTable(){
    return this._timeTable;
  }
  set timeTable(foo){
    this._timeTable = foo;
  }

  /* Définition des méthodes */

  // Procédure ajoutant un créneau au docteur
  // slot is Slot Object
  addSlot(slot){
    this.timeTable.add(slot);
  }

}
