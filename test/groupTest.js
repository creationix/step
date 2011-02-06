require('./helper');

var dirListing = fs.readdirSync(__dirname),
    dirResults = dirListing.map(function (filename) {
      return fs.readFileSync(__dirname + "/" + filename, 'utf8');
    });

expect('one');
expect('two');
expect('three');
Step(
  function readDir() {
    fulfill('one');
    fs.readdir(__dirname, this);
  },
  function readFiles(err, results) {
    fulfill('two');
    if (err) throw err;
    // Create a new group
    assert.deepEqual(dirListing, results);
    var group = this.group();
    results.forEach(function (filename) {
      if (/\.js$/.test(filename)) {
        fs.readFile(__dirname + "/" + filename, 'utf8', group());
      }
    });
  },
  function showAll(err , files) {
    fulfill('three');
    if (err) throw err;
    assert.deepEqual(dirResults, files);
  }
);

expect('four');
expect('five');
// When the group is empty, it should fire with an empty array
Step(
  function start() {
    var group = this.group();
    fulfill('four');
  },
  function readFiles(err, results) {
    if (err) throw err;
    fulfill('five');
    assert.deepEqual(results, []);
  }
);