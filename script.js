/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library
   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const STARTSCHERM = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = 2;

var achtergrondImage;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler
var spelerImage;
var vijandImageGroot;
var vijandImageMiddel;
var vijandImageKlein;
var achtergrond;

const SPEELVELDBREEDTE = 1280;
const SPEELVELDHOOGTE = 720;
const AANTALVIJANDENGROOT = 2;
const AANTALVIJANDENMIDDEL = 1;
const AANTALVIJANDENKLEIN = 2;

var vijandenGrootX = [];   // x-positie van vijand
var vijandenGrootY = [];   // y-positie van vijand
var vijandenMiddelX = [];   
var vijandenMiddelY = [];   
var vijandenKleinX = [];   
var vijandenKleinY = [];   
var vijandenSnelheid = []; // horizontale snelheid van vijand

var timerSec = 0; // aantal behaalde punten = behaalde tijd
var timerMin = 0;
var timerMiliSec = 0;

function preload() {
    spelerImage = loadImage('afbeeldingen/plaatje_raket.png');
    vijandImageGroot = loadImage('afbeeldingen/asteroid_groot.png');
    vijandImageMiddel = loadImage('afbeeldingen/asteroid_middel.png');
    vijandImageKlein = loadImage('afbeeldingen/asteroid_klein.png');
    achtergrond = loadImage('afbeeldingen/ruimte.jpg');
}



/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */
 
        

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  image(achtergrond, 20, 20, width - 2 * 20, height - 2 * 20);
};


/**
 * Tekent de vijand
 */
var tekenVijand = function() {
    for (var i = 0; i < vijandenGrootX.length; i++) {
        image(vijandImageGroot, vijandenGrootX[i], vijandenGrootY[i]);
    };

    for (var j = 0; j < vijandenMiddelX.length; j++) {
        image(vijandImageMiddel, vijandenMiddelX[j], vijandenMiddelY[j]);
    };

    for (var k = 0; k < vijandenKleinX.length; k++) {
        image(vijandImageKlein, vijandenKleinX[k], vijandenKleinY[k]);
    };
    
};

/**
 * Beweegt vijand
 */
var beweegVijand = function() {
    for (var i = 0; i < vijandenGrootX.length; i++) {
        vijandenGrootY[i] = vijandenGrootY[i] + vijandenSnelheid[i];

        if (vijandenGrootY[i] > SPEELVELDHOOGTE + 200) {
            vijandWeg(i);
            nieuweVijand();
        }
    };
    for (var j = 0; j < vijandenMiddelX.length; j++) {
        vijandenMiddelY[j] = vijandenMiddelY[j] + vijandenSnelheid[j];

        if (vijandenMiddelY[j] > SPEELVELDHOOGTE + 200) {
            vijandWeg(j);
            nieuweVijand();
        }
    };
    for (var k = 0; k < vijandenKleinX.length; k++) {
        vijandenKleinY[k] = vijandenKleinY[k] + vijandenSnelheid[k];

        if (vijandenKleinY[k] > SPEELVELDHOOGTE + 200) {
            vijandWeg(k);
            nieuweVijand();
        }
    };
};

/**
 * Haalt vijand weg
 */
function vijandWeg(nummer) {
    vijandenGrootX.splice(nummer, 1);
    vijandenGrootY.splice(nummer, 1);
    vijandenMiddelX.splice(nummer, 1);
    vijandenMiddelY.splice(nummer, 1);
    vijandenKleinX.splice(nummer, 1);
    vijandenKleinY.splice(nummer, 1);
    vijandenSnelheid.splice(nummer, 1);
}

/**
 * Maakt nieuwe vijand 
 */
function nieuweVijand() {
    vijandenGrootX.push(random(5, SPEELVELDBREEDTE - 10))
    vijandenGrootY.push(random(-500, -100));
    vijandenMiddelX.push(random(5, SPEELVELDBREEDTE - 10))
    vijandenMiddelY.push(random(-500, -100));
    vijandenKleinX.push(random(5, SPEELVELDBREEDTE - 10))
    vijandenKleinY.push(random(-500, -100));
    vijandenSnelheid.push(random(5, 13));
}

/**
 * Tekent en beweegt de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("white");
  image(spelerImage, spelerX, spelerY);
};

/**
 * Beweegt speler met muis
 */
var beweegSpeler = function() {
    var muisXPos = mouseX;
    var muisYPos = mouseY;

    var maxX = SPEELVELDBREEDTE - 80;
    var minX = 20;
    var maxY = SPEELVELDHOOGTE - 80;
    var minY = 20;

    if (muisXPos > maxX) {
        muisXPos = maxX;
    }
    else if(muisXPos < minX) {
        muisXPos = minX;
    };
    spelerX = muisXPos;

    if (muisYPos > maxY) {
        muisYPos = maxY;
    }
    else if(muisYPos < minY) {
        muisYPos = minY;
    };
    spelerY = muisYPos;
};



/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var geraakt = false;
var checkVijandGeraaktKlein = function() {
    geraakt = collideRectCircle(mouseX, mouseY, 50, 50, vijandenKleinX - 15, vijandenKleinY + 20, 15, 20);

console.log(geraakt);    
return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


var tekenTimer = function() {
    timerMiliSec++;

    if (timerMiliSec == 60) {
        timerMiliSec = 0;
        timerSec++;
    }
    if (timerSec == 60) {
        timerSec = 0;
        timerMin++;
    }

    
    fill('white');
    textSize(35);
    text(timerMin.toString(), 90, 100, 900, 750);
    text(":", 110, 100, 900, 750);
    text(timerSec.toString(), 125, 100, 900, 750);
    text(":", 160, 100, 900, 750);
    text(timerMiliSec.toString(), 175, 100, 900, 750);

};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  background('blue');
  createCanvas(SPEELVELDBREEDTE, SPEELVELDHOOGTE);

  for (var i = 0; i < AANTALVIJANDENGROOT; i++) {
      nieuweVijand();
  };
  for (var j = 0; j < AANTALVIJANDENMIDDEL; j++) {
      nieuweVijand();
  };
  for (var k = 0; k < AANTALVIJANDENKLEIN; k++) {
      nieuweVijand();
  };
    
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function draw() {
  switch (spelStatus) {
    case STARTSCHERM:
        rect(0,0,SPEELVELDBREEDTE,SPEELVELDHOOGTE);
        fill('white');
        textSize(35);
        text('Druk op ENTER om te starten', 325, 200, SPEELVELDBREEDTE - 270, 300);
        text('Elke seconde is een punt waard!', 325, 100, 800, 100);
        textFont('Courier New');
        textSize(100);
        text('METEOR GARDEN', 440, SPEELVELDHOOGTE / 2 + 25, 600, SPEELVELDHOOGTE / 2 + 200);
        fill(51,51,255);
        if (keyIsPressed === true && keyCode === 13) {
            spelStatus = SPELEN;
        }
    break;
        


    case SPELEN:
    beweegVijand();
    beweegSpeler();
    rect(0,0,SPEELVELDBREEDTE,SPEELVELDHOOGTE);
    tekenVeld();
    tekenSpeler();
    tekenVijand();
    tekenTimer();
    checkVijandGeraaktKlein();

    
    if (checkGameOver()) {
        spelStatus= GAMEOVER;
    }
    break;
    case GAMEOVER:
        rect(0,0,SPEELVELDBREEDTE,SPEELVELDHOOGTE)
        fill('white')
        textSize(100);
        text('GAME OVER', 275, SPEELVELDHOOGTE / 2 - 200, 800, SPEELVELDHOOGTE / 2 + 100)
        fill('black')
    }
    
  }


