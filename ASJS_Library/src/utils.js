/*
  utils.js
  Main utils used by asjs
*/

/**
 * Read the header of a complex data type from memory
 * @param {Number} ptr
 * @param {ArrayBuffer} memoryBuffer
 * @returns {Object}
 */
function readCommonHeader(ptr, memoryBuffer){
  let U32 = memoryBuffer.U32 || new Int32Array(memoryBuffer);
  var header = {
    rtSize: U32[ptr - 4 >>> 2],
    rtId: U32[ptr - 8 >>> 2],
    gcInfo2: U32[ptr - 12 >>> 2],
    gcInfo: U32[ptr - 16 >>> 2],
    mmInfo: U32[ptr - 20 >>> 2]
  }
  return header;
}

/**
 * Read a string from memory and return the string
 * @param {Number} ptr
 * @param {ArrayBuffer} memoryBuffer
 * @returns {String}
 */
function stringFromMemory(ptr, memoryBuffer){
  let U16 = memoryBuffer.U16 || new Int16Array(memoryBuffer);
  let header = readCommonHeader(ptr, memoryBuffer);
  let length = header.rtSize / 2;
  let _string = "";
  for (let i=0; i < length; i++){
    _string += String.fromCharCode(U16[ptr + (i * 2) >>> 1]);
  }
  return _string;
}

/**
 * Read an array from memory and return the array
 * @param {Number} ptr
 * @param {ArrayBuffer} memoryBuffer
 * @returns {Array}
 */
function arrayFromMemory(ptr, memoryBuffer){
  let U32 = memoryBuffer.U32 || new Int32Array(memoryBuffer);
  let ArrayBufferViewPtr = U32[ptr >>> 2];
  let length = U32[ptr + 12 >>> 2];
  let outArray = [];
  for (let i = 0; i < length; i++){
    outArray.push(U32[(ArrayBufferViewPtr >>> 2) + i]);
  }
  return outArray;
}

let Utils = {
  readCommonHeader,
  stringFromMemory,
  arrayFromMemory
}
export { Utils };