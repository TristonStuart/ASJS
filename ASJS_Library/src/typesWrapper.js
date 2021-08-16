/*
  typesWrapper.js
  Wraps the type classes to make the api easier to use.
  Instead of the developer passing the memoryBuffer for every call,
  this will wrap all the types and uses the memoryBuffer from the wasm load.
*/

function wrapType(type, memoryBuffer){
  return class TypeWrapper extends type {
    static fromMemory(pointer, structure, _structure){
      if (_structure){
        /*
          fromMemory was called like (pointer, buffer, structure)
          We rewrite structure to the real structure (_structure)
        */
        structure = _structure;
      }
      return type.fromMemory.apply(this, [pointer, memoryBuffer, structure]);
    }
  }
}

function wrapTypeApi(types, memoryBuffer){
  let outApi = {};
  for (let i in types){
    outApi[i] = wrapType(types[i], memoryBuffer);
  }
  return outApi;
}

export { wrapType, wrapTypeApi };