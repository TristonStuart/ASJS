let asCode = ASJS.loadAS("./AssemblyScript/index.wasm");
asCode.useExports("index.js");
console.log(asCode.Exports.add(10, 20));