require('./helper');

var exception = new Error('Catch me!');

expect('one');
expect('two');
expect('three');
Step(
  function () {
    fulfill('one');
    var callback = this;
    setTimeout(function () {
      callback(exception);
    });
  },
  function (err) {
    fulfill('two');
    assert.equal(exception, err, "error should passed through");
    throw exception;
  },
  function (err) {
    fulfill('three');
    assert.equal(exception, err, "error should be caught");
  }
);