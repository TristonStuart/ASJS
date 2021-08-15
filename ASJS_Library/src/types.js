/*
  types.js
  Contains all the base type info for the library.

  Notes:
  Array.Struct = {arrayType: Type | ReturnType<Type.Struct>, ...Type.Struct}
*/

import { Utils } from "./utils";

/**
 * @typedef {{structure: {arrayType: Type | ReturnType<Type.Struct>}} & ReturnType<Type.Struct>} arrayStruct
 */

/**
 * The basic Type class that all types build ontop of
 */
class Type {
  constructor(value, typeName){
    this.value = value;
    this.typeName = typeName;
  }

  static Struct(structure){
    return {structure, isStruct: true, type: this.type, fromMemory: this.fromMemory};
  }

  /**
   * Get the value from the memory pointer (aka returned value)
   * @param {Number} pointer
   * @param {ArrayBuffer} memoryBuffer
   * @param {ReturnType<Type.Struct>} structure
   * @returns {Type}
   */
  static fromMemory(pointer, memoryBuffer, structure){
    return new this(pointer, this.type);
  }

  static type = "Type";
}

class i32 extends Type {
  /**
   * @param {Number} value
   */
  constructor(value){
    super(value, i32.type);
  }

  static type = "i32";
}

class boolean extends Type {
  /**
   * @param {Number | Boolean} value
   */
  constructor(value){
    if (typeof value == "number"){
      // Convert wasm boolean value (0 = false, 1 = true) to a real boolean (true/false).
      value = !!value;
    }
    super(value, boolean.type);
  }

  static type = "boolean";
}

class string extends Type {
  /**
   * @param {String} value
   */
  constructor(value){
    super(value, string.type);
  }

  /**
   * Get the value from the memory pointer (aka returned value)
   * @param {Number} pointer
   * @param {ArrayBuffer} memoryBuffer
   * @param {ReturnType<Type.Struct>} structure
   * @returns {string}
   */
  static fromMemory(pointer, memoryBuffer, structure){
    new this(Utils.stringFromMemory(pointer, memoryBuffer));
  }

  static type = "string";
}

class Array extends Type {
  /**
   * @param {Type[]} value
   */
  constructor(value){
    super(value, Array.type);
  }

  /**
   * Array Type Structure
   * @param {ReturnType<Type.Struct> | Type} arrayType
   */
  static Struct(arrayType){
    return {arrayType, isStruct: true, type: this.type, fromMemory: this.fromMemory};
  }

  /**
   * Get the value from the memory pointer (aka returned value)
   * @param {Number} pointer
   * @param {ArrayBuffer} memoryBuffer
   * @param {ReturnType<Array.Struct>} structure
   * @returns {string}
   */
  static fromMemory(pointer, memoryBuffer, structure){
    let outArray = [];
    let readArray = Utils.arrayFromMemory(pointer, memoryBuffer);
    for (let i = 0; i < readArray.length; i++){
      outArray.push(structure.arrayType.fromMemory(readArray[i], memoryBuffer, (structure.arrayType.isStruct)? structure.arrayType : {}));
    }
    return outArray;
  }

  static type = "Array";
}

let Types = {
  _type: Type,
  i32,
  boolean,
  string,
  Array
}

export { Types };