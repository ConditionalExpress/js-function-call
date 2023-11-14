// javascript with test program
// running on the terminal: node app.js
//
console.log("here we are");

// open file in asynchronous way
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

function openCsvFile(file) {
  var data = openFileSync(file);
  console.log("csv: ", data);
  // prepare csv file format; e.g. in this way
  let lines = data.split("\n"); // newline
  let header = lines.shift(); // the first line is the header
  let headers = header.split(","); // split into array of headers
  console.log(headers);
  // now do your work with the rows...
  for (const line of lines) {
    console.log(line);
    let rows = line.split(",");
    for (const row of rows) {
      console.log(row);
    }
  }

  return data;
}

function openJsonFile(file) {
  var res = openFileSync(file);
  console.log("json: ", res);
  // prepare json file format; e.g. in this way
  var data = JSON.parse(res);
  let headers = data.headers; // .headers name; same as in data file
  let rows = data.rows; // dto.
  for (let j = 0; j < headers.length; j++) {
    console.log(headers[j]);
  }

  for (let i = 0; i < rows.length; i++)
    for (const row of rows[i]) {
      console.log(row);
    }
  return;
}
function callFunctionsByKey(key, file) {
  var functionList = {
    csv: function () {
      return openCsvFile(file);
    },
    json: function () {
      return openJsonFile(file);
    },
  };
  // test, if key is in list
  let ret = functionList.hasOwnProperty(key);
  if (ret) {
    // true := key found; false -> not found
    var func = functionList[key];
    ret = func(); // call function: open...File(s) from list above
  } else {
    // or doing the default action
    console.log("error key not in list: ", key);
  }
  return ret;
}

// ------------------------------------------------
// now we test our work...
let file = "./data.json"; // test file with data
// key is the file extension
let res = file.split(".");

let key = res[res.length - 1]; // extension is the last occurence of this splitting
console.log(res);
callFunctionsByKey(key, file);

//.done enf of test
console.log("bye, bye"); // or try console.trace("my msg"); // show the callstack of modules
