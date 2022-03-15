// Elements
var game = document.getElementById("game");
var dino = document.getElementById("dino");
var cactus = document.getElementById("cactus");
var ground = document.getElementById("ground");
var gameOverScreen = document.getElementById("game-over-screen");
var digits = document.getElementById("digits");
// Globals
var PI1000 = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067\
                9821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819\
                6442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127\
                3724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609\
                4330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491\
                2983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513\
                2000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923\
                5420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185\
                9502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730\
                35982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";
var numDigits = 1;
var gameIsOver = false;
function checkNumber(num) {
    return (parseInt(PI1000[numDigits]) == num);
}
function dinoJump(keyPressed) {
    if (gameIsOver)
        return;
    var numPressed = parseInt(keyPressed);
    if (numPressed == NaN)
        return;
    if (checkNumber(numPressed)) {
        // Cannot jump more than once at a time
        if (dino.classList.contains("jump"))
            return;
        // Make dino jump
        dino.classList.add("jump");
        // Increment pointer to digit
        numDigits++;
        // Add digit to display
        digits.innerText += numPressed;
        // Remove the jump class after 0.3s
        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
    }
    else {
        game.classList.add("wrong-number");
        setTimeout(function () {
            dino.classList.remove("wrong-number");
        }, 200);
    }
}
function gameOver() {
    // Hide play elements
    dino.style.display = "none";
    cactus.style.display = "none";
    ground.style.display = "none";
    // Show game over
    gameOverScreen.style.display = "inline";
    document.getElementById("score").innerText = (numDigits - 1).toLocaleString();
    gameIsOver = true;
    // Refresh to play again
    document.addEventListener("keydown", function (event) {
        if (event.key == "Enter")
            location.reload();
    });
}
// Check if dino is still alive on set interval
var isAlive = setInterval(function () {
    // console.log("Checking dino alive");
    // Check if dino position overlaps with cactus
    // Get positions
    var dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    var cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    // Collision detection
    if (cactusLeft < 40 && cactusLeft > 0) {
        if (dinoTop >= 140) {
            // Collision
            gameOver();
        }
    }
}, 10);
document.addEventListener("keydown", function (event) {
    dinoJump(event.key);
});
