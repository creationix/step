require('./helper');

var selfText = fs.readFileSync(__filename, 'utf8'),
    etcText = fs.readFileSync('/etc/passwd', 'utf8');

expect('one');
expect('two');
Step(
  // Loads two files in parallel
  function loadStuff() {
    fulfill('one');
    fs.readFile(__filename, this.parallel());
    fs.readFile("/etc/passwd", this.parallel());
  },
  // Show the result when done
  function showStuff(err, code, users) {
    fulfill('two');
    if (err) throw err;
    assert.equal(selfText, code, "Code should come first");
    assert.equal(etcText, users, "Users should come second");
  }
);
