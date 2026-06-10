let mx=0, my=0, pmx=0, pmy=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  drawGridLines(3);
}

let lastTheta = null;

function draw() {
  for(let asdf = 0; asdf<50; asdf++){
  pmx = mx;
  pmy = my;
  // mx = (mouseX-width*0.25)/100;
  // my = (mouseY-height*0.5)/100;
  let ang = random(0,2*PI);
  mx = (mouseX+20*cos(ang)-width*0.25)/100;
  my = (mouseY+20*sin(ang)-height*0.5)/100;

  if(mouseIsPressed){
    push();
    translate(width*0.25,height*0.5);
    scale(100);
    strokeWeight(0.03);
    stroke(0,0,255);
    line(pmx,pmy,mx,my);
    pop();
    
    let steps = 50;
    let pimx=0, pimy=0, imx=0, imy=0;
    for(let i = 0; i<steps; i++){
      pimx = imx;
      pimy = imy;
      imx = map(i,0,steps-1,pmx,mx);
      imy = map(i,0,steps-1,pmy,my);
      if(i>0){
        push();
        translate(width*0.75,height*0.5);
        scale(30);
        strokeWeight(0.1);
        stroke(0,255,0);
        let r = Math.exp(imx);
        let pr = Math.exp(pimx);
        line(pr*cos(pimy),pr*sin(pimy),r*cos(imy),r*sin(imy));
        pop();
      }
    }
  }

  if(keyIsPressed){
    let polar_mx = (mouseX - width * 0.75) / 30;
    let polar_my = (mouseY - height * 0.5) / 30;
    let polar_pmx = (pmouseX - width * 0.75) / 30;
    let polar_pmy = (pmouseY - height * 0.5) / 30;

    push();
    translate(width * 0.75, height * 0.5);
    scale(30);
    strokeWeight(0.1);
    stroke(0, 255, 0);
    line(polar_pmx, polar_pmy, polar_mx, polar_my);
    pop();

    let steps = 50;
    let pimx = 0, pimy = 0, imx = 0, imy = 0;
    
    for(let i = 0; i < steps; i++){
      pimx = imx;
      pimy = imy;
      
      let cur_polar_x = map(i, 0, steps - 1, polar_pmx, polar_mx);
      let cur_polar_y = map(i, 0, steps - 1, polar_pmy, polar_my);
      
      let r = Math.sqrt(cur_polar_x * cur_polar_x + cur_polar_y * cur_polar_y);
      let theta = Math.atan2(cur_polar_y, cur_polar_x);
      
      if (lastTheta !== null) {
        let diff = theta - lastTheta;
        if (diff > Math.PI) {
          theta -= 2 * Math.PI;
        } else if (diff < -Math.PI) {
          theta += 2 * Math.PI;
        }
      }
      lastTheta = theta;

      imx = Math.log(r);
      imy = theta;
      
      if(i > 0){
        push();
        translate(width * 0.25, height * 0.5);
        scale(100);
        strokeWeight(0.03);
        stroke(0, 0, 255);
        line(pimx, pimy, imx, imy);
        pop();
      }
    }
  } else {
    lastTheta = null;
  }
}
}

function drawGridLines(g){
  noFill();

  push();
  translate(width*0.25,height*0.5);
  scale(100);
  stroke(255);
  strokeWeight(0.03);
  for(let x = -g; x<=g; x++){
    line(x,-g,x,g); // vertical lines -> circles
  }
  for(let y = -g; y<=g; y++){
    line(-g,y,g,y); // horizontal lines -> radiating rays
  }
  pop();

  push();
  translate(width*0.75,height*0.5);
  scale(30);
  stroke(255);
  strokeWeight(0.1);
  for(let x = -g; x<=g; x++){
    let r = Math.exp(x);
    ellipse(0,0,2*r,2*r); // vertical lines -> circles
  }
  for(let y = -g; y<=g; y++){
    // line(-g,y,g,y); // horizontal lines -> radiating rays
  }
  pop();
}