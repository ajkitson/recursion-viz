var StackTree = function (args, parent) {
  this.args = args;
  this.parent = parent;
  this.children = [];
  this.result = undefined; //just for clarity
};
StackTree.prototype.add = function (childTree) {
  this.children.push(childTree);
}

var visualize = function (fn, name) {
  var root, currentStack;

  return function () {
    var args = Array.prototype.slice.call(arguments);

    // first pass through, set up empty root node
    if (!root) root = currentStack = new StackTree();

    var newLevel = new StackTree(args, currentStack);
    currentStack.add(newLevel);
    currentStack = newLevel;

    //do viz stuff -- must draw before return or we don't see anything until recursion bottoms out
    //just placeholder for now
    showStack(root);

    //evaluate our function!
    var result = currentStack.result = fn.apply(null, args);
    currentStack = currentStack.parent;

    if (currentStack === root) {
      // we're all done, so allow our stacks to be garbage collected
      currentStack = root = undefined;
    }
    return result ;
  };
};

//examples for testing
var factViz = visualize(function (n) {
  if (n === 0) return 1;
  return n * factViz(n - 1);
})

var fibViz = visualize(function (n) {
  if (n === 0 || n === 1) return 1;
  return fibViz(n - 1) + fibViz(n - 2); 
});