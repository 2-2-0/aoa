class Environment {
  constructor () {
    this.elements = [];
    this.w = 900;
    this.h = 600;
  }
  step () {
    for (let i=0; i<this.elements.length; i++) {
      this.elements [i].step ();
    }
  }
  addElement (element) {
    this.elements.push (element);
  }
  consume (element_index) {
    let resource = this.elements [element_index];
    this.elements.splice (element_index, 1);

    let feed = map (resource.size, 1, 8, 30, 100);

    return feed;
  }
  gaze (x, y, sight_range) {
    let found_elements = [];
    for (let i=0; i<this.elements.length; i++) {
      let element = this.elements [i];
      let distance = dist (x, y, element.x, element.y);
      if (distance<=sight_range) found_elements.push (element);
    }
    return found_elements;
  }
}
