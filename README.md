# ASJS - An AssemblyScript Tool

**ASJS is a tool that helps improve the compatibility of [AssemblyScript](https://www.assemblyscript.org/) and JavaScript by letting the two easily transfer complex data types.**

### Getting Started

You can get the ASJS JavaScript library from our cdn link (https://cdn.jsdelivr.net/gh/TristonStuart/ASJS@master/README.md). This will give you access to the JavaScript library (but not the complete set of features see [Multiple ways...](./#Multiple ways to use ASJS))

### What is Assembly Script?

[AssemblyScript](https://www.assemblyscript.org/) compiles [TypeScript](http://www.typescriptlang.org/) to [WebAssembly](http://webassembly.org/) code. This code can than me ran in the browser at near native speeds thanks to it being a compiled language. You can then call AssemblyScript functions from JavaScript like normal functions (pass in arguments, get a return value).

### What does ASJS do?

One problem of AssemblyScript is that WebAssembly won't let AssemblyScript and JavaScript share strings, arrays, or objects (allthough future proposals should allow this). <br>

This severly limits the usefulness and flexibility that one would need to say, make a game in AssemblyScript, and output the display instructions to JavaScript. <br>

ASJS attempts to solve this problem by translating memory pointers to complex data types into their JavaScript equivalents.


### Multiple ways to use ASJS

Their are multiple ways to use ASJS depending on your goals and needs. The most basic tool is the JavaScript ASJS library. This library will be used to translate complex data from AssemblyScript to JavaScript and back again. You will need to manually call the api functions or setup an auto converter for each export. <br>

There is also an AssemblyScript based api which can help better structure objects for easier interpreting in JavaScript. <br>

Another option is using ASJS to run a [typescript-parser](https://www.npmjs.com/package/typescript-parser) to automatically make a JavaScript file that will tell the ASJS library how to convert each export. Then for your project as part of the building process you would run ASJS and have it output a JavaScript file you would then include in your final product. This JavaScript file will directly interact with the api so you wont have to. You can pass and get objects freely without touching the api.

### ASJS Javascript Library

*Everything about asjs in javascript*

#### Importing the library

The easiest way to get the library is to include it in your script using our cdn link (https://cdn.jsdelivr.net/gh/TristonStuart/ASJS@master/README.md). <br>

Another option is to download the project and build the library yourself (we use [WebPack](https://webpack.js.org/)) but you won't need to do that unless you are planning on making changes to the library.