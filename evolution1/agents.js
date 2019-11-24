var sim_timer;
var sim_click = 150;

var environment;

function setClick (click) {
  sim_click = click;
}
function setup () {
  var canvas = createCanvas (windowWidth, windowHeight, P2D);
  canvas.parent ('game_area');

  environment = new Environment ();
  for (let i=0; i<1; i++) {
    new_agent = new Agent (randomInt (10, environment.w-20), randomInt (10, environment.h-20), environment);
    environment.addElement (new_agent);
  }
  for (let i=0; i<75; i++) {
    new_resource = new Food (randomInt (10, environment.w-20), randomInt (10, environment.h-20));
    environment.addElement (new_resource);
  }
  for (let i=0; i<15; i++) {
    new_resource = new Rock (randomInt (10, environment.w-20), randomInt (10, environment.h-20));
    environment.addElement (new_resource);
  }

  ellipseMode (RADIUS);

  sim_timer = millis ();
}
function draw () {
  if (millis ()-sim_timer>sim_click) {
    //print (".");
    environment.step ();
    sim_timer = millis ();
  }
  background (0, 16, 64);
  strokeWeight (2);
  textAlign (CENTER, TOP);
  textSize (8);
  for (let i=0; i<environment.elements.length; i++) {
    element = environment.elements [i];
    switch (element.category) {
      case 100: // agent
        status = "\n"+element.energy+"\n"+element.fuel+"\n";
        status+= element.state+"|"+element.intention+"\n";
        status+= element.x+"|"+element.target_x+"\n";
        status+= element.y+"|"+element.target_y;

        noStroke ();
        fill (192, 16, 24, 32);
        ellipse (element.x, element.y, element.sight_range, element.sight_range);

        stroke (255, map (element.energy, 0, 100, 0, 255));
        if (element.state==110) fill (0);
        else fill (192, 16, 24, map (element.fuel, 0, 100, 0, 255));
        ellipse (element.x, element.y, 8, 8);
        noStroke ();

        noStroke ();
        fill (255, 255, 0);
        ellipse (element.target_x, element.target_y, 3, 3);

        fill (255);
        text (status, element.x, element.y+20);
        break;
      case 11: // food
        noStroke ();
        fill (0, 192, 64);
        ellipse (element.x, element.y, element.size, element.size);

        status = i;
        fill (255);
        text (status, element.x, element.y+8);
        break;
      case 50: // Rock
        noStroke ();
        fill (72);
        ellipse (element.x, element.y, element.size, element.size);
        break;
    }
  }

} // draw
