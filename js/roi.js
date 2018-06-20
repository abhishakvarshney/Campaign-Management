var PythonShell = require('python-shell');
 
PythonShell.run('roi.py', function (err) {
  if (err) throw err;
  console.log(results);
});
