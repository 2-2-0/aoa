class Element {
  constructor (x, y) {
    this.category = 0;

    this.x = x;
    this.y = y;

    this.size = 0;
  }
  step () {
  }
}
class Resource extends Element {
  constructor (x, y) {
    super (x, y);
    this.category = 10; // resource
  }
}
class Rock extends Resource {
  constructor (x, y) {
    super (x, y);
    this.category = 50; // Simple rock
    this.size = randomInt (1, 6);
  }
}
class Food extends Resource {
  constructor (x, y) {
    super (x, y);
    this.category = 11; // Food
    this.size = randomInt (2, 8);

  }
}
class Agent extends Element {
  constructor (x, y, env) {
    super (x, y);
    this.category = 100;

    this.env = env;

    this.state = 0;
    this.intention = 0;
    this.action = 0;

    this.speed = 1.0;
    this.target_x = this.x;
    this.target_y = this.y;

    this.elements_on_sight = [];
    this.sight_range = 60;

    this.energy = 100;
    this.fuel = 100;

    this.decay_rate = 1.0;
    this.fuel_rate = 1.0;

    this.memories = [];
  }
  step () {
    // if not asleep
    if (this.state!=110) {
      if (this.fuel>-10) this.fuel-= this.fuel_rate;
      if (this.fuel<85 && this.state!=200) {
        this.state = 200;
        this.intention = 100;

      }
      // Perception
      this.elements_on_sight = this.env.gaze (this.x, this.y, this.sight_range);
      // Add to memory if not there
      for (let i=0; i<this.elements_on_sight.length; i++) {
        let element = this.elements_on_sight [i];
        if (!this.memories.includes (element)) {
          //print ("Added memory!");
          this.memories.push (element);
          let d = document.getElementById ("info_area");
          d.innerHTML+= "<br />";
          d.innerHTML+= element.category+"|"+element.x+"/"+element.y;
        }
      }

      if (this.energy>1) this.energy-= this.decay_rate;
      else {
        // ...then drop totally exhausted!
        this.intention  = 0;
        this.state = 110;
      }
    } else {
      if (this.fuel>-10) this.fuel-= this.fuel_rate/10;
    }



    // Cognition
    switch (this.state) {
      case 0:
        break;
      case 110:
        // Sleeping!
        this.stepSleeping ();
        break;
      case 200:
        // Starving!!
        this.stepStarving ();
        break;
    }

    // Actions
    // if not asleep
    if (this.state!=110) {
      // and has a target to reach
      if (this.action==10) {
        // then walk to it!
        this.walkToTarget ();
      }
    }
  }
  stepSleeping () {
    // Check where is he sleeping to check rest levels
    if (this.energy<100) this.energy+= 3.0;
    else {
      this.state = 0;
      this.intention = 0;
    }

  }
  stepStarving () {
    switch (this.intention) {
      case 0:

        break;
      case 100:
        this.findFood ();
        break;
      case 120:
        this.eatFood ();
        break;
    }
  }
  findFood () {
    let closest_element = null;
    let closest_distance = this.env.w;

    //let found_elements = this.env.gaze (this.x, this.y, this.sight_range);
    for (let i=0; i<this.elements_on_sight.length; i++) {
      let element = this.elements_on_sight [i];
      // is it food?
      if (element.category==11) {
        // It is!
        let distance = this.distanceToElement (element);
        if (distance<closest_distance) {
          closest_element = element;
          closest_distance = distance;
        }
      }
    }

    if (closest_element!=null) {
      this.target_x = closest_element.x;
      this.target_y = closest_element.y;

      // Is it in range?
      if (this.distanceToTarget ()>2) {
        // no! walk towards it!
        this.action = 10;
      } else {
        // stick to it like a leech!
        this.x = this.target_x;
        this.y = this.target_y;
        this.target_element = closest_element;

        // change intention to eat
        this.action = 0;
        this.intention = 120;
        print ("Got it!");
        //print (this.target_element);
      }

    } else {
      // set new search point if needed
      if (this.distanceToTarget ()<2) {
        this.target_x = this.x+randomInt (-this.sight_range, this.sight_range);
        this.target_y = this.y+randomInt (-this.sight_range, this.sight_range);
        this.action = 10;
      }
    }
  }
  eatFood () {
    let element_index = this.env.elements.indexOf (this.target_element);
    if (element_index==-1) {
      // Someone took it!
      this.intention = 100;

      this.action = 0;
    } else {
      this.fuel+= this.env.consume (element_index);
      //this.fuel = 100;
      this.state = 0;
      this.intention = 0;
      this.action = 0;
    }
  }
  distanceToTarget () {
    return dist (this.x, this.y, this.target_x, this.target_y);
  }
  distanceToElement (element) {
    return dist (this.x, this.y, element.x, element.y);
  }
  walkToTarget () {
    if (this.distanceToTarget ()<2) {
      // Target point reached!
      this.x = this.target_x;
      this.y = this.target_y;
      this.action = 0;
      //this.decay_rate = 1.0;
    } else {
      if (this.x<this.target_x) this.x+= this.speed; else this.x-= this.speed;
      if (this.y<this.target_y) this.y+= this.speed; else this.y-= this.speed;
      //this.decay_rate = 1.2;
    }
  }
}
