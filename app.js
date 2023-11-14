// javascript with test program
// running on the terminal: node app.js
//
console.log("here we are");

// open file in asynchronous way
// return: file content
function openFileSync() {
  console.log("open file: ", file);
  const fs = require("fs");
  var data = undefined; // set default value for data
  try {
    data = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.error("error open file: ", err);
  }
  return data;
}

// open csv file and prepare csv format in array(s)
// return: headers (is array) and rows (is arrays of array)
function openCsvFile(file) {
  var data = openFileSync(file);
  //console.log("csv: ", data);
  // prepare csv file format; e.g. in this way
  let lines = data.split("\n"); // newline
  let header = lines.shift(); // the first line is the header
  let headers = header.split(","); // split into array of headers
  //console.log(headers);
  var rowArray = new Array();
  // now do your work with the rows...
  for (const line of lines) {
    var obj = new Array();
    //console.log(line);
    let rows = line.split(",");
    for (const row of rows) {
      obj.push(row);
      //console.log(row);
    }
    rowArray.push(obj);
  }

  return [header, rowArray]; // returning multiple values
}
// open json file and prepare json format in array(s)
function openJsonFile(file) {
  var res = openFileSync(file);
  //console.log("json: ", res);
  // prepare json file format; e.g. in this way
  var data = JSON.parse(res);
  let headers = data.headers; // .headers name; same as in data file
  let rows = data.rows; // dto.

  // loop over the header; only for output on terminal
  // for (let j = 0; j < headers.length; j++) {
  //   console.log(headers[j]);
  // }

  // // loop over all rows; only for output on terminal
  // for (let i = 0; i < rows.length; i++)
  //   for (const row of rows[i]) {
  //     console.log(row);
  //   }
  return [headers, rows];
}
function callFunctionsByKey(key, file) {
  var functionList = {
    csv: function () {
      return openCsvFile(file);
    },
    json: function () {
      return openJsonFile(file);
    },
    // and so on...
  };
  // test, if key is in list
  let ret = functionList.hasOwnProperty(key);
  var result = undefined;
  if (ret) {
    // true := key found; false -> not found
    var func = functionList[key];
    result = func(); // call function: open...File(s) from list above
  } else {
    // or doing the default action here
    console.log("error key not in list: ", key);
  }
  return result; // returning values from call
}

// ------------------------------------------------
// now we test our work...
let file = "./data.json"; // test file with data
// key is the file extension
let res = file.split(".");

let key = res[res.length - 1]; // extension is the last occurence of this splitting
//console.log(res);
let result = callFunctionsByKey(key, file);
let headers = result[0];
let rows = result[1];
console.log(`header: ${headers}`); // result with backtick`
let i = 0;
for (const row of rows) {
  console.log(`row${i++}: ${row}`);
}

//.done enf of test
console.log("\nbye, bye\n"); // or try console.trace("my msg"); // show the callstack of modules
