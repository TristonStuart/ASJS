class TypesWrapper {
  constructor(_wasm, Types){
    let mainThis = this;
    let types = Object.getOwnPropertyNames(Types);
    let baseType = Types._type;
    for (let i of types){
      if (i == "_type"){continue;}
      let type = Types[i];

      mainThis[i]
    }
  }
}