var visualize = function (fn, name) {
  var stackLevel = 0;
  var lastResult;

  return function () {
    var args = [].slice.call(arguments);

    //do viz stuff -- must draw before return or we don't see anything until recursion bottoms out
    //just placeholder for now
    console.log('stackLevel: ' + stackLevel + '   arguments: ' + args + '   result so far: ' + lastResult);

    stackLevel++;  //maybe use tree structure in order to represent branching calls, which calls are children of which, etc.
    lastResult = fn.apply(null, args);
    stackLevel--;
    return lastResult;
  }
}


var factViz = visualize(function (n) {
  if (n === 0) return 1;
  return n * factViz(n - 1);
})

var fibViz = visualize(function (n) {
  if (n === 0 || n === 1) return 1;
  return fibViz(n - 1) + fibViz(n - 2); 
});