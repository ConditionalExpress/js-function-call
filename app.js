// js test program
console.clear();
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
    var func = functionList[key];
    ret = func(); // call function: open...
  } else {
    console.log("error key not in list: ", key);
  }
}

// now we test our work...
let file = "./data.csv"; // test file with data
// key is the file extension
let res = file.split(".");

let key = res[res.length - 1]; // extension is the last occurence of this splitting
console.log(res);
callFunctionsByKey(key, file);
