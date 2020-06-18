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

var achtergrondImage;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler
var spelerImage;

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

const SPEELVELDBREEDTE = 1280;
const SPEELVELDHOOGHTE = 720;

var vijandenX = [];   // x-positie van vijand
var vijandenY = [];   // y-positie van vijand
var vijandenSnelheid = []; // horizontale snelheid van vijand
var vijandYSnelheid = -2; // verticale snelheid van vijand
var vijandImage;

var score = 0; // aantal behaalde punten

function preload() {
    spelerImage = loadImage('afbeeldingen/plaatje_raket.png');
    vijandImage = loadImage('afbeeldingen/asteroid.png');
    achtergrondImage = loadImage('afbeeldingen/space.png');
}

let vijanden = [];


/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */
 
// teken startscherm//
switch (spelStatus) {
    case UITLEG:
        var mijnVar = 0;
        background (0,0, 255);
        fill('blue');
        textSize(24);
        text('Druk op spatiebalk om te starten', 200, 200, 500, 50);

    if (keyIsPressed === true && key === "") {
        console.log ("pressed space");
        spelStatus = SPELEN;
        aantalLevens = 1;
        score = 0;

    }
    break; 
    case SPELEN:
        beweegVijand();
        beweegSpeler();

        
}


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  image(achtergrondImage, 0, 0, SPEELVELDBREEDTE, SPEELVELDHOOGHTE);
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    image(vijandImage, 50, 50);
};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  image(spelerImage, mouseX, mouseY);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
/* var beweegVijand = function() {
    this.x = this.x + random(-4, 4);
    this.y = this.y + random(-4, 4);
    /* for (var i = 0; i < vijandenX.length; i++) {
        vijandenY[i] = vijandenY[i] + vijandenSnelheid[i];

        if (vijandenY[i] > 720 + 20) {
            vijandenY[i] = random(-250, -30);
            vijandenX[i] = random(20, 1280 -20);
            vijandenSnelheid[i] = random(2, 10);
        }
    } 
}; */


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {

};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

return false;
};

class vijand {
    constructor(x, y, radius = 50) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.brightness = 0;
    }
    
    intersects(other) {
    let afstandVijanden = dist(this.x, this.y, other.x, other.y);
        if (afstandVijanden < this.radius + other.radius) {
            return true;
            } else {
                return false;
            }
        }
    
    changeColor(licht) {
        this.helderheid = licht;
    }

    contains(px, py) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.radius) {
            return true;
        } else {
            return false;
        }
    }

    move() {
    this.x = this.x + random(-4, 4);
    this.y = this.y + random(-4, 4);
    }
    
    show() {
    stroke(255);
    strokeWeight(5);
    fill(51);
    ellipse(this.x, this.y, this.radius * 2);
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


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  background('blue');
  createCanvas(1280, 720);
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(10, 50);
    vijanden[i] = new vijand(x, y, radius);
  }
  
}
   /* for (var i =0; i < 5; i++ ) {
      vijandenX.push(random(20, 1280 -20));
      vijandenY.push(random(-250, -30));
      vijandenSnelheid.push(random(2, 10));
  } */

  // Kleur de achtergrond blauw, zodat je het kunt zien
  



/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      // beweegVijand();
      beweegKogel();
      beweegSpeler();
    
    tekenVeld();
    for (let v of vijanden) {
        v.show();
        v.move();
        let overlappen = false;
        for (let other of vijanden) {
            if (v !== other && v.intersects(other)) {
                overlappen = true
            }
        }
        if (overlappen) {
            v.changeColor(255);
        } else {
            v.changeColor(0);
        }
    }

      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      
      tekenVijand (vijandenX, vijandenY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}