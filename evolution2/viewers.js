class ViewSimpleVector {
  constructor (environment) {
    this.environment = environment;
  }
  draw () {
    let status;
    background (64, 0, 16);
    strokeWeight (2);
    textAlign (CENTER, TOP);
    textSize (8);
    for (let i=0; i<this.environment.elements.length; i++) {
      let element = this.environment.elements [i];
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
  }
}
