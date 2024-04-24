//GLOBAL VARIABLES
let w = 600, h = 600; //declaring global with W being the width of the canvas 600 and H being height of the canvas 600 
let value = 15, value2 = 5; //declearing global variable value initial of 5 this variable controls the number of iterations in the outer loop and, value2 initial of 15 this variable controls the number of iterations in the Inner loop. 
let t; //declaring global variable t that will be take the frame count multiplied by a constant (0.012)
let degree, degree2; //declaring global Degree, Degree2 to be used to calculate angle in radians for each iteration on the For loop 
let z; //declaring global Z variable to be used to calucate the distance from the origin (0,0) in a polar coordinate
let x, y; // declaring global variable x, y cartesian coordinates to be used as coordinates of shapes drawn on the canvas
let imageType = 0; //declaring image type with inital value 0/null
let soundFile2; //delcearing variable for SoundFile to load a audio file
let music; //delclearing variable for music to be used in function
let button; //declearing global variable button to be used to click start music
let music2; //declearing global variable for music2 be used  in a function
let music3; //declearing global variable for music3 to be used in function
let button2; //declearing global variable button2 to be used to click start music2
let button3; //declearing global variable button3 to be used to click start music3
let slider; //declearing a slider global variable for volume controller

//PRELOAD
function preload() { // declaring a preload function to load in the song files
  soundFormats('m4a', 'mp3'); // setting supported sound formats to play mutli type of media
  sound = loadSound("sound3.mp3"); // loading sound file "sound3.mp3"
  soundFile = loadSound("sound1.m4a"); // loading sound file "sound1.m4a"
  soundFile2 = loadSound("sound3.m4a") // loading sound file "sound3.m4a"
}

//SETUP
function setup() { // declaring a setup function to run once
  let cnv = createCanvas(w, h); // creating a canvas with width and height of w(600) and h(600)
  cnv.mousePressed(userStartAudio); // calling userStartAudio function when mouse is pressed on canvas to play audio
  cnv.id("p5-canvas"); // assigning an id to the canvas to edit on CSS
  cnv.style('display', 'block'); // setting display style of the canvas to block edit on CSS
  amplitude = new p5.Amplitude(); // creating an Amplitude object
  button = createButton("Music 1"); // creating a button labeled "Music 1"
  button.mousePressed(Music); // calling Music function when button is pressed
  button2 = createButton("Music 2"); // creating a button labeled "Music 2"
  button2.mousePressed(Music2); // calling Music2 function when button2 is pressed
  button3 = createButton("Music 3"); // creating a button labeled "Music 3"
  button3.mousePressed(Music3); // calling Music3 function when button3 is pressed
  slider = createSlider(0, 1, 1, 0); // creating a slider with minimum value 0, maximum value 1, starting value 1, and step size 0.01
  slider.addClass("mySliderStyle"); // adding a class to the slider to edit for visuals
}

//FUNCTIONS
function Music() { // declaring a function named Music
  amplitude.setInput(soundFile); // setting the input of the amplitude to soundFile
  soundFile.play(); // playing the soundFile

  if (soundFile.isPlaying()) { // checking if soundFile is current
    sound.stop(); // stopping the sound if it's playing
    soundFile2.stop(); // stopping the Music1 if it's playing
  }
}

function Music2() { // declaring a function named Music2
  amplitude.setInput(sound); // setting the input of the amplitude to sound
  sound.play(); // playing the sound

  if (sound.isPlaying()) { // checking if soundFile is currently playing
    soundFile.stop(); // stopping the soundFile if it's playing
    soundFile2.stop(); // stopping the Music1 if it's playing
  }
}

function Music3() { // declaring a function named Music2
  amplitude.setInput(soundFile2); // setting the input of the amplitude to sound
  soundFile2.play(); // playing the sound

  if (soundFile2.isPlaying()) { // checking if soundFile is currently playing
    soundFile.stop(); // stopping the Music2 if it's playing
    sound.stop(); // stopping the Music1 if it's playing
  }
}

//DRAW
function draw() { // declaring the draw function
  sound.setVolume(slider.value()); // setting the volume of the sound based on the value of the slider
  soundFile.setVolume(slider.value()); // setting the volume of the soundFile based on the value of the slider
  soundFile2.setVolume(slider.value()); // setting the volume of the soundFile2 based on the value of the slider
  let level = amplitude.getLevel(); // declaring a local variable level to have the value of the amplitude level
  let size = map(level, 0, 1, 0, 10); // mapping the amplitude level to a size range
  let size2 = map(level, 0, 1, 50, 200); // mapping the amplitude level to a size range
  let size3 = map(level, 0, 1, 0, 50); // mapping the amplitude level to a size range
  background(0, 25); // setting the background color with transparency
  translate(w / 2, h / 2); // translating to the center of the canvas

  if (size2 >= 150) {  // check if size2 is greater than or equal to 150
    shearX(level); // shear transformation to the X axis based on the (level) variable
    shearY(-level); // shear transformation to the Y axis based on the negative value of (level) variable
    filter(INVERT); // INVERT filter to invert the colors of the canvas
    imageType = Math.floor(random(1, 4)); // Randomly select an image type (1 to 4) and assign it to (imageType)
  }




  t = frameCount * 0.012; //framecount * 0.12 that increments by 1*0.012 creating animation effects

  for (let i = 0; i < value; i++) {  //maping // Map the value of (i) to an angle in radians
    degree = map(i, 0, value, 0, TWO_PI) // Mapping (i) to angle in radians

    for (let a = 0; a < value2; a++) { // Inner loop iterating over 'value2' times
      degree2 = map(a, 0, value2, 0, TWO_PI);  //maping the value of 'a' to an angle in radians

      if (keyIsPressed) {  // check if any key is pressed
        switch(key) {  // switch based on the pressed key
          case '1': // if the pressed key is '1'
            imageType = 1; // set imageType to 1
            break; // exit the switch statement
            case '2': // if the pressed key is '2'
            imageType = 2; // set imageType to 2
            break; // exit the switch statement
          case '3': // if the pressed key is '3'
            imageType = 3; // set imageType to 3
            break; // exit the switch statement
          case '4': // if the pressed key is '4'
            imageType = 4; // set imageType to 4
            break; // exit the switch statement
        }
      }
      switch(imageType) { // Switch based on the value of imageType
        case 1: // If imageType is 1 

         // calculates the position based on the mapped degree * t (tangent) + t(frameCount increament) and draw an ellipse on the canvas
          z = size2 + tan(t);  //calculates the value of z based on the value of size2 + tangent of t
          x = z * cos(degree * t); // calculates the value X to the value Z to the distance from (0,0) * cos degree value * t(frameCount increment) to position my x coordinate
          y = z * sin(degree * t); // calculates the value X to the value Z to the distance from (0,0) * cos degree value * t(frameCount increment) to position my x coordinate
      
          //Drawing the ellipse
          noStroke();  // No stroke on the ellipse
          fill(255); // setting the fill color white
          ellipse(x, y, size, size);  // to draw an ellipse at (x coordinate value of X, y coordinate of the Y value) with the width and height of the size
          break; // exit the switch statement

          case 2: // if imageType is 2

         // calculates the position based on the mapped degree * (tangent) t + (frameCount increament) and draw an lines on the canvas 
          z = size2 + tan(t); //calculates the value of z based on the value of size2 + tangent of t
          x = z * cos(degree * t); // calculates the value X to the value Z to the distance from (0,0) * cos degree value * t(frameCount increment) to position my x coordinate
          y = z * sin(degree * t); // calculates the value Y to the value Z to the distance from (0,0) * cos degree value * t(frameCount increment) to position my y coordinate

         // drawing lines
          strokeWeight(1); // setting the thickness of lines to 1
          stroke(255); //setting the color of lines to white
          beginShape(LINES); // initiating Beginshape LINES
          vertex(x, size3); // first point x-coordinate of the the line (x to the mapped value of Size3)
          vertex(size3, y); // second point size3 on the x-coordinate of the line, (y coordinate is using the value of y)
          vertex(x, y); // third point is taking (x-coordinate value of x and y-coordinate value of y)
          endShape(); // end the drawing of the lines
          break; // exit the switch statement

         case 3: // If imageType is 3
          // Calculate the position based on the mapped degree * t (tangent) + (frameCount increament) and draw a smaller ellipse
          z = size2 + tan(t); //calculates the value of z based on the value of size2 + tangent of t
          x = z * cos(degree2 * t); // calculates the value X to the value Z to the distance from (0,0) * cos degree2 value * t(frameCount increment) to position my x coordinate using degree2 to vary x position
          y = z * sin(degree * t); // calculates the value Y to the value Z to the distance from (0,0) * cos degree value * t(frameCount increment) to position my y coordinate
         // draw a smaller ellipse
          noStroke(); // No stroke outline on the ellipse
          fill(255); // fill with white color
          ellipse(x, y, size / 1.5, size / 1.5);  // to draw a slower ellipse at (x coordinate value of X, y coordinate of the Y value) with the width and height of the size divided by 1.5
          break; // Exit the switch statement
        case 4: // If imageType is 4
          z = size2 + tan(t);  //calculates the value of z based on the value of size2 + tangent of t
          x = z * cos(degree2 * t);  // calculates the value X to the value Z to the distance from (0,0) * cos degree2 value * t(frameCount increment) to position my x coordinate using degree2 to vary x position
          y = z * sin(degree * t); // calculates the value Y to the value Z to the distance from (0,0) * cos degree value * t(frameCount increment) to position my y coordinate

          // drawing a smaller ellipse
          strokeWeight(1);  // setting the thickness of lines to 1
          stroke(255); // setting the color of lines to white
          beginShape(LINES); // initiating Beginshape LINES
          vertex(x, size2); // first point x-coordinate of the the line (x to the mapped value of Size2)
          vertex(x, y); // third point is taking (x-coordinate value of x and y-coordinate value of y)
          endShape(); // end the drawing of the lines
          break; // exit the switch statement
      }
    }
  }
}
