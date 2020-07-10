class EventSourcer {

  constructor() {
    this.value = 0;
    this.stack = [];
    this.undoStack = [];
  }

  add(num) {
    this.stack.push([num, "a"]);
    this.value = this.value + num;
    return this.value;
  }

  subtract(num) {
    this.stack.push([num, "s"])
    this.value = this.value - num;
    return this.value;
  }
  
  undo() {
    try{
      const toUndo = this.stack.pop();
      if (toUndo[1] == 's'){
        this.add(toUndo[0]);
      } else if (toUndo[1] == 'a'){
        this.subtract(toUndo[0]);
      }
      this.undoStack.push(toUndo);
    } catch {
      // do nothing
    }
  }

  redo() {
    try{
      const toRedo = this.undoStack.pop();
      if (toRedo[1] == 's'){
        this.subtract(toRedo[0]);
      } else if (toRedo[1] == 'a'){
        this.add(toRedo[0]);
      }
      this.stack.push(toRedo);
    } catch {
      // do nothing
    }
  }

  bulk_undo(num) {
    var i;
    for (i=0; i<num; i++){
      this.undo();
    }
  }

  bulk_redo(num) {
    var i;
    for (i=0; i<num; i++){
      this.redo();
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
