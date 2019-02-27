// Classe représentant une chambre

class Room{

  // id is String
  constructor(id){
    this._id = id;
    this._timeTable = new TimeTable();
    this._slots = this._timeTable.slots;
  }

  /* Définition des accesseurs et des mutateurs */

  get id(){
    return this._id;
  }

  get timeTable(){
    return this._timeTable;
  }
  set timeTable(foo){
    this._timeTable = foo;
  }

  /* Définition des méthodes */

  // Procédure qui ajoute un créneau à la chambre
  // slot is Slot Object
  addSlot(slot){
    this.timeTable.add(slot);
  }
}
