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

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

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

var img 
var img2
var backGroundImage
var loadImage 





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


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
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    fill('red');
    rect(50,50,50,50);

};



/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  image(img, mouseX, mouseY);
};

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

}

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    for (var i = 0; i < vijandenX.length; i++) {
        vijandenY[i] = vijandenY[i] + vijandenSnelheid[i];

        if (vijandenY[i] > SPEELVELDHOOGHTE + 20) {
            geefVijandNieuwePositie(i)
        }
    }
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

};

function genereerVijanden() {
    for(var i = 0; i < AANTALVIJANDEN; i++) {
        vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
    }
}

function respawnVijand(){
    for(var i = 0; i < vijanden.length; i++) {
        vijanden[i].drawAndMove();
        if(vijanden[i].isBuitenCanvas()) {
            vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
        }
        if(vijanden[i].raaktSpeler()) {
            spelerHP--;
            vijanden[i] = new Enemy (random(20, 1100), random( 20 ,150), random(2, 7));
        }
    }
}

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

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(SPEELVELDBREEDTE, SPEELVELDHOOGHTE);

  for (var i =0; i < AANTALVIJANDEN; i++ ) {
      geefVijandNieuwePositie(i);
  }

  setInterval(updateTimer, 1000);

  console.log(vijandenX);
  console.log(vijandenSnelheid);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
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
      case GAMEOVER;
      break; 
  }
}