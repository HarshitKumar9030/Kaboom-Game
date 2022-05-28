import kaboom from "kaboom"

// Setting a title for the page
document.title = 'Coder, Coffee and Bugs'

// Initialize context
kaboom({
  font: "sink",
  background: [210, 210, 155,],
})

// Lets load the Sprites
loadSprite("bug", "sprites/bug.png");
loadSprite("programmer", "sprites/programmer.png");
loadSprite("coffee", "sprites/coffee.png");
loadSprite("coffeejar", "sprites/coffeejar.png");

// Lets load the Music
loadSound("background", "sounds/background.mp3");
loadSound("game over", "sounds/game over.mp3");
loadSound("harry harry", "sounds/harry harry.mp3");
loadSound("sip", "sounds/sip.mp3");

// Lets define some game variables
let SPEED = 620
let BSPEED = 2
let SCORE = 0
let scoreText;
let bg = false;
let backgroundMusic;

// Lets define a function to display our score
const displayScore = () => {
  destroy(scoreText)
  // a simple score counter
  scoreText = add([
    text("Score: " + SCORE),
    scale(3),
    pos(width() - 181, 21),
    color(10, 10, 255)
  ])
}

// Lets define a function to play background music
const playBg = () => {
  if (!bg) {
    backgroundMusic = play("background", { volume: 0.5 })
    bg = true;
  }
}

// Lets add the player
const player = add([
  sprite("programmer"),  // renders as a sprite
  pos(120, 80),    // position in world
  area(),          // has a collider
  scale(0.13),
])

// Lets add events to our player 
onKeyDown("left", () => {
  playBg()
  player.move(-SPEED, 0)
})

onKeyDown("right", () => {
  playBg()
  player.move(SPEED, 0)
})

onKeyDown("up", () => {
  playBg()
  player.move(0, -SPEED)
})

onKeyDown("down", () => {
  playBg()
  player.move(0, SPEED)
})

// Lets add 4 bugs and a coffee on loop
loop(2, () => {
  for (let i = 0; i < 4; i++) {
    let x = rand(0, width())
    let y = height()

    let c = add([
      sprite("bug"),
      pos(x, y),
      area(),
      scale(0.13),
      "bug"
    ])
    c.onUpdate(() => {
      c.moveTo(c.pos.x, c.pos.y - BSPEED)
    })
  }

  let x = rand(0, width())
  let y = height()

  // Lets introduce a coffee for our programmer to drink
  let c = add([
    sprite("coffee"),
    pos(x, y),
    area(),
    scale(0.13),
    "coffee"
  ])
  c.onUpdate(() => {
    c.moveTo(c.pos.x, c.pos.y - BSPEED)
  })
  if (BSPEED < 13) {
    BSPEED += 1
  }
})

loop(10 , () => {
  let x = rand(0, width())
  let y = height() 

    let cj = add([
    sprite("coffeejar"),
    pos(x, y),
    area(),
    scale(0.13),
    "coffeejar"
  ])
  cj.onUpdate(() => {
    cj.moveTo(cj.pos.x, cj.pos.y - BSPEED)
  })
  if (BSPEED < 13) {
    BSPEED += 1
  }
 })

player.onCollide("bug", () => {
  backgroundMusic.volume(0.2)
  play("game over")
  destroy(player)
  addKaboom(player.pos)
  scoreText = add([
    text("Game Over"),
    scale(3),
    pos(10, 21),
    color(10, 10, 255)
  ])
})

player.onCollide("coffee", (coffee) => {
  backgroundMusic.volume(0.2)
  play("sip", {
    volume: 2
  })
  destroy(coffee)
  SCORE += 1
  displayScore()
  // 2 seconds until the volume is back
  wait(2, () => {
    backgroundMusic.volume(0.5)
  })
})

player.onCollide("coffeejar", (coffeejar) => {
  backgroundMusic.volume(0.4)
  play("sip", {
    volume: 4
  })
  destroy(coffeejar)
  SCORE += 4
  displayScore()
  // 2 seconds until the volume is back
  wait(2, () => {
    backgroundMusic.volume(0.5)
  })
})

// Display the score
displayScore()