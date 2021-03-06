/*
  loader.js
  Api for loading a wasm buffer
*/

function instantiate(wasmBuffer){
  return WebAssembly.instantiate(wasmBuffer, {Date, module: {}, env:{abort: function(){console.log(arguments)}, seed: function(){}}});
}

function load(wasmBuffer){
  return new Promise((resolve, reject)=>{
    instantiate(wasmBuffer).then(
      /**
       * 
       * @param {{instance: WebAssembly.Instance, module: WebAssembly.module}} module
       * @returns 
       */
      module => resolve(module));
  });
}

async function loadSync(wasmBuffer){
  let module = await instantiate();
  return module;
}

export {load, loadSync};