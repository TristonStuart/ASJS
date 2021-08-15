/*
  library.js
  Exports all the exposed api functions for webpack.
  Entry point for webpack.
*/

import { Utils } from "./utils";
import { Types } from "./types";
import { load } from "./loader";

class wasm {
  /**
   * 
   * @param {ArrayBuffer} wasmBuffer
   * @param {()=>void} onLoad
   */
  constructor(wasmBuffer, onLoad){
    let mainThis = this;
    this.Exports;
    this.Memory;
    this.Table;
    this.module;
    this.onLoad = onLoad;
    load(wasmBuffer).then(
      /**
       * 
       * @param {{instance: WebAssembly.Instance, module: WebAssembly.module}} module
       */
      module => {
      mainThis.module = module;
      mainThis.Exports = module.instance.exports;
      mainThis.Memory = module.instance.exports.memory;
      mainThis.Table = module.instance.exports.table;
      mainThis.onLoad(mainThis);
    });
  }
}

let _api = {Types, Utils};
export { wasm, _api };