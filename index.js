// function handleClick ()
// {
//     alert("i got clicked")
// }
// document.querySelector("button").addEventListener("click",handleClick)
var n = document.querySelectorAll(".drum").length;
for (var i = 0; i < n; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    // this.style.color="white"
    var okok = this.innerHTML;
    makesound(okok);
    buttonAnimation(okok);
  });
}

addEventListener("keypress", function(event) {
  makesound(event.key);
  buttonAnimation(event.key);
});

function makesound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log(key);
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}






//Added changes




var origin;

var frame = 0;
var flyBoxCount = 20;
var flyBoxes = [];
var flyBoxPause = 200;
var flyBoxColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  origin = createVector(windowWidth/2, windowHeight/2);
  
  for(i = -flyBoxCount/2; i < flyBoxCount/2; i++) {
    var box = createFlyBox(i);
    box.start();
    flyBoxes.push(box);
  }
  
  var getRandColor = () => {
    return color(random(100, 200), random(100, 200), random(100, 200));
  }

  flyBoxColors.push(color('#f2623a'));
  flyBoxColors.push(color('#3af262'));
  flyBoxColors.push(color('#623af2'));
  flyBoxColors.push(color('#f23a58'));
  flyBoxColors.push(color('#caf23a'));
}

function draw() {
  rectMode(CENTER);
  for(i = 0; i < flyBoxCount; i++) {
    var flyBox = flyBoxes[i];
    flyBox.draw();
  }
  
  // WIP
  stroke(0, 0, 0);
  strokeWeight(40);
  noFill();
  translate(origin.x, origin.y);
  rotate((sin(frame*0.02) + cos(frame*0.03))*PI);
  //rect(0, 0, 300, 300);
  
  frame += 1;
}

function createFlyBox(offset) {
  return {
    offset: offset,
    delay: 0,
    getRandomDelay: () => { return random(0, flyBoxCount) * 15; },
    steps: 0,
    directions: [createVector(-1, -1), createVector(-1, 1), createVector(1, -1), createVector(1, 1)],
    currentDirection: 0,
    iteration: 0,
    size: 80,
    start: function() {
      this.delay = this.getRandomDelay();
      this.steps = -this.delay;
    },
    draw: function() {
      this.steps += 20;
      
      if(this.steps < 0) {
        return;
      }
      
      fill(flyBoxColors[this.iteration]);
      noStroke();
      var dir = this.directions[this.currentDirection];
      rect(
        -dir.x*this.steps + origin.x + dir.x*origin.x - dir.x*this.offset * (this.size*0.75),
        -dir.y*this.steps + origin.y + dir.y*origin.y + dir.y*this.offset * (this.size*0.75),
        this.size, this.size);
      
      if(this.steps > max(windowWidth, windowHeight)) {
        var newDelay = this.getRandomDelay();
        this.steps = -flyBoxPause + this.delay - newDelay;
        this.delay = newDelay;
        this.currentDirection = (this.currentDirection + 1) % 4;
        this.iteration = (this.iteration + 1) % flyBoxColors.length;
      }
    }
  }
}
