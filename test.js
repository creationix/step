var Step = require(__dirname + "/lib/step"),
    fs = require('fs'),
    sys = require('sys');

Step(
  function () {
    var group = this.group();
    [1,2,3,4,5,6].forEach(function (num) {
      fs.readFile(__filename, group());
    });
  },
  function (err, contents) {
    if (err) { throw err; }
    sys.p(contents);
  }
);

Step(
  function readSelf() {
    fs.readFile(__filename, this);
  },
  function capitalize(err, text) {
    if (err) {
      throw err;
    }
    return text.toUpperCase();
  },
  function showIt(err, newText) {
    sys.puts(newText);
  }
);


Step(
  // Loads two files in parallel
  function loadStuff() {
    fs.readFile(__filename, this.parallel());
    fs.readFile("/etc/passwd", this.parallel());
  },
  // Show the result when done
  function showStuff(err, code, users) {
    if (err) throw err;
    sys.puts(code);
    sys.puts(users);
  }
)

Step(
  function readDir() {
    fs.readdir(__dirname, this);
  },
  function readFiles(err, results) {
    if (err) throw err;
    // Create a closure to the parallel helper
    var parallel = this.parallel;
    results.forEach(function (filename) {
      if (/\.js$/.test(filename)) {
        fs.readFile(__dirname + "/" + filename, parallel());
      }
    });
  },
  function showAll(err /*, file1, file2, ...*/) {
    if (err) throw err;
    var files = Array.prototype.slice.call(arguments, 1);
    sys.p(files);
  }
);

var myfn = Step.fn(
  function (name) {
    fs.readFile(name, this);
  },
  function capitalize(err, text) {
    if (err) {
      throw err;
    }
    return text.toUpperCase();
  }
);
myfn(__filename, sys.p);
