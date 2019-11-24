var sim_timer;
var sim_click = 150;

var environment;
var viewer;

function setClick (click) {
  sim_click = click;
}
function setup () {
  var canvas = createCanvas (windowWidth, windowHeight, P2D);
  canvas.parent ('game_area');

  environment = new Environment ();
  environment = populateEnvironment (environment, 7, 75, 15);
  viewer = new ViewSimpleVector (environment);

  ellipseMode (RADIUS);

  sim_timer = millis ();
}
function populateEnvironment (environment, agents, food, rocks) {
  for (let i=0; i<7; i++) {
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

  return environment;
}
function draw () {
  if (millis ()-sim_timer>sim_click) {
    //print (".");
    environment.step ();
    sim_timer = millis ();
  }

  viewer.draw ();
} // draw
