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
var spelStatus = 0;

var achtergrondImage;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler
var spelerXSnelheid = 8;
var spelerYSnelheid = 6;

const SPEELVELDBREEDTE = 1280;
const SPEELVELDHOOGHTE = 720;
const SPEELVELDRANDBREEDTE = 20;
const SPELERDIAMETER =80;

const AANTALVIJANDEN = 10;
const VIJANDDIAMETER = 40;
var vijandenX = 200;
var vijandenY = 100;
var vijandenSnelheid = 2;
var vijanden = 6;

var stopwatchMin = 0; //stopwatch in min
var stopwatchSec = 0; //stopwatch in sec 

var score = 0; // aantal behaalde punten

var img; 
var img2;
var backGroundImage;
var loadImage;





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */
 
// teken startscherm//
var tekenStartscherm = function () {
    background (0,0, 255);
        fill('blue');
        textSize(28);
        text('Druk op spatiebalk om te starten', 475, 530, 575, 630);

        fill(0, 0, 255);
        textSize (85);
        textFont('Courier New');
        text('METEOR GARDEN', 400, 140, 500, 240);

    };      

        

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  rect(backGroundImage, 20, 20, width - 2 * 20, height - 2 * 20);
};

function preload () {
    img = loadImage('plaatjes/plaatje_raket.png');
    img2 = loadImage('plaatje/asteroid.png');
    backGroundImage = loadImage('plaatjes/space.png');
    
};

/**
 * Tekent de vijand
 */
var tekenVijand = function(x, y) {
    image(img2,50,50);
};



/**
 * Tekent en beweegt de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  image(img, mouseX, mouseY);
};

/*
function tekenTimer() {
    var extraNul = ""
    if (stopwatchSec < 10) {
            extraNul = "0"
    }

    if (spelStatus === SPELEN) {
        fill("white");
        text(stopwatchMin + ":" + extraNul + stopwatchSec, 50, 50, 100, 100);
    }

    if (spelStatus === GAMEOVER) {
        fill('white');
        text(stopwatchMin + ";" + extraNul + stopwatchSec, 690, 380, 100, 100);
    }

} */

/**
 * Beweegt speler met muis
 */
/*
var beweegVijand = function() {
    for (var i = 0; i < vijandenX.length; i++) {
        vijandenY[i] = vijandenY[i] + vijandenSnelheid[i];

        if (vijandenY[i] > SPEELVELDHOOGHTE + 20) {
            geefVijandNieuwePositie(i)
        }
    }
};

    var maxX = SPEELVELDBREEDTE - 80;
    var minX = 20;
    var maxY = SPEELVELDHOOGTE - 80;
    var minY = 20;

/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

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
    var gameOver = false;
    for 
            gameOver= true;
        }
    }
  return gameOver;
};

/*
function updateTimer() {
    stopwatchSec++;

    if (stopwatchSec == 60) {
        stopwatchMin++;
        stopwatchSec = 0;
    }
}

function geefVijandNieuwePositie(nummer) {
    vijandenX[nummer] = (random(20, SPEELVELDBREEDTE - 20));
    vijandenY[nummer] = (random(-250, -30));
    vijandenSnelheid[nummer] = (random(2, 10));
}
*/

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(SPEELVELDBREEDTE, SPEELVELDHOOGHTE);

  /*
  for (var i =0; i < AANTALVIJANDEN; i++ ) {
      geefVijandNieuwePositie(i);
  }

  setInterval(updateTimer, 1000);

  console.log(vijandenX);
  console.log(vijandenSnelheid);

  */
 
  // Kleur de achtergrond blauw, zodat je het kunt zien
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
/*
function draw() {
  switch (spelStatus) {
    case STARTSCHERM:
        rect(0,0,SPEELVELDBREEDTE,SPEELVELDHOOGTE);
        fill('white');
        textSize(35);
        text('Druk op ENTER om te starten', 325, 200, SPEELVELDBREEDTE - 270, 300);
        text('Elke seconde is een punt waard', 325, 100, 800, 100)
        textFont('Courier New');
        textSize(100);
        text('METEOR GARDEN', 440, SPEELVELDHOOGTE / 2 + 25, 600, SPEELVELDHOOGTE / 2 + 200);
        fill(51,51,255)
        if (keyIsPressed === true && keyCode === 13) {
            spelStatus = SPELEN;
        }
        break;
        


    case SPELEN:
      beweegVijand();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      background(backGroundImage);
      beweegSpeler(); 
      respawnVijand();
      tekenVeld();
        tekenSpeler(spelerX, spelerY);
        tekenTimer();
      checkGameOver();

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
        background;
        tekenTimer();
        clearTimeout();
      }
      case GAMEOVER:
      break; 
  }
} */
