// Classe représentant un patient

class Patient{

  // name is String
  // surname is String
  constructor(name, surname){
    this._name = name;
    this._surname = surname;
    this._id = name + surname;
    this._color = 'rgba('+ Math.floor(Math.random()*200)+','+Math.floor(Math.random()*200)+','+Math.floor(Math.random()*200)+',0.8)'
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

  get id(){
    return this._id;
  }

  get color(){
    return this._color;
  }
  set color(foo){
    this._color = foo;
  }

}
