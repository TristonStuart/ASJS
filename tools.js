/*
  tools.js
  ASJS Project and Build tools.
  Run through command line using node.
*/

const fs = require('fs');
const webpack = require('webpack');

let processArgs = process.argv.splice(2);
let helpText = `-- ASJS Tools.js Help --
Run tools.js like : node tools.js --command param1 param2
Commands:
  --help : Show help menu
  --project [name] : Creates a new project in ./Projects
  --buildLib: Builds the ASJS Library`;

let basicFiles = {
  buildConfig: ``,
  indexJS: `let asCode = ASJS.loadAS("./AssemblyScript/index.wasm");
asCode.useExports("index.js");
console.log(asCode.Exports.add(10, 20));`,
  indexHTML: `<html>
  <head>
    <script src="https://cdn.jsdelivr.net/gh/TristonStuart/ASJS@master/ASJS_Library/dist/asjs.js"></script>
    <script src="./AssemblyScript/asExports.js"></script>
    <script src="./index.js></script>
  </head>
</html>`,
  indexTS: `// Write your Assembly Script code here!
export function add(i1: i32, i2: i32): i32{
  return i1 + i2;
}`,
  indexWASM: ``,
  asExports: `ASJS.defineExports([
  {type: "function", name: "add", arguments: [["i1", "i32"], ["i2", "i32"]], return: "i32"}
], "index.js")`
};

switch (processArgs[0]){
  case '--help': {
    console.log(helpText);
    break;
  }
  case '--project': {
    let projectName = processArgs[1] || "defaultName";
    let projectFoldDir = `./Projects/${projectName}`;

    console.log(`Making project "${projectName}" ...`);

    if (!fs.existsSync(projectFoldDir)){
      fs.mkdirSync(projectFoldDir);
      fs.mkdirSync(`${projectFoldDir}/AssemblyScript`);
      fs.writeFileSync(`${projectFoldDir}/asjs.build.config.js`, basicFiles.buildConfig);
      fs.writeFileSync(`${projectFoldDir}/index.js`, basicFiles.indexJS);
      fs.writeFileSync(`${projectFoldDir}/index.html`, basicFiles.indexHTML);
      fs.writeFileSync(`${projectFoldDir}/AssemblyScript/index.ts`, basicFiles.indexTS);
      fs.writeFileSync(`${projectFoldDir}/AssemblyScript/index.wasm`, basicFiles.indexWASM);
      fs.writeFileSync(`${projectFoldDir}/AssemblyScript/asExports.js`, basicFiles.asExports);
    }else {
      console.error(`Project ${projectName} at ${projectFoldDir} already exists!`);
    }

    console.log(`done`);
    break;
  }
  case `--buildLib`:{
    let webpackConfig = require('./ASJS_Library/webpack.config');
    const compiler = webpack(webpackConfig);
    compiler.run(function(err, result){
      if (err){
        console.log(`WebPack Error : ${err}`);
      }else {
        console.log(`WebPack Result: ${result}`);
      }
      compiler.close((closeErr)=>{
        console.log('compiler closed. Done');
      });
    });
    break;
  }
  default: console.log(helpText);
}