
var stackTree = function (args, parent) {
  this.args = args;
  this.parent = parent;
  this.children = [];
  this.result = undefined; //just for clarity
};

var visualize = function (fn, name) {
  var root = new stackTree(); 
  var currentStack = root; 

  return function () {
    var args = Array.prototype.slice.call(arguments);

    var newLevel = new stackTree(args, currentStack);
    currentStack.children.push(newLevel);
    currentStack = newLevel;

    //do viz stuff -- must draw before return or we don't see anything until recursion bottoms out
    //just placeholder for now
    console.log(currentStack);

    //evaluate our function!
    var result = currentStack.result = fn.apply(null, args);
    currentStack = currentStack.parent;

    return result ;
  };
};


var factViz = visualize(function (n) {
  if (n === 0) return 1;
  return n * factViz(n - 1);
})

var fibViz = visualize(function (n) {
  if (n === 0 || n === 1) return 1;
  return fibViz(n - 1) + fibViz(n - 2); 
});