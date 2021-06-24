/*rules
https://en.wikipedia.org/wiki/Craps#Rules_of_play
https://www.venetian.com/casino/table-games/craps-basic-rules.html#:~:text=An%20even%20money%20bet%2C%20made,before%20a%207%20to%20win.

https://towardsdatascience.com/run-python-code-on-websites-exploring-brython-83c43fb7ac5f
https://stackoverflow.com/questions/7460938/how-to-run-python-script-in-webpage
https://www.digitalocean.com/community/tutorials/how-to-set-up-an-apache-mysql-and-python-lamp-server-without-frameworks-on-ubuntu-14-04
*/
//js coockie via IIFE?
//variabelen
var shooter = true;
var bet = null;
var transitionEnd = whichTransitionEvent();
//knoppen
let roll = document.querySelector("#roll")
//roll-knop
roll.addEventListener("click", Roll);
//switch-knop
document.querySelector("#switch").addEventListener("click", switchRole);
//place-bet knoppen
document.querySelector("#PL").addEventListener("click", lineBetPL);
document.querySelector("#DPL").addEventListener("click", lineBetDPL);
//reset
document.querySelector("#resetknop").addEventListener("click", reset)
//update roll
document.querySelector(".d-odd").addEventListener(transitionEnd, updateScore, false);

//reset
function reset() {
    shooter = true;
    document.querySelector("#not-shooter").style.display = "none";
    document.querySelector(".dice>h4").style.display = "none";
    document.querySelector("#shooter").style.display = "block";
    roll.disabled = true;
    resetBet()
}
//roll
function Roll() {

    if (shooter) {
        if (!roll.disabled) {
            diceRoll();
        }
    } else {
        diceRoll();
    }
}

//dobbelsteenfucties
//roll iedere dobbelsteen
function diceRoll() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
        toggleClasses(die);
        die.dataset.roll = randomNumber()
    });
}
//verander de dobbelsteen
function toggleClasses(die) {
    die.classList.toggle("d-odd");
    die.classList.toggle("d-even");
}
//random nummer (1-6)
function randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}
//verandere roll-value
function updateScore() {
    const dice = [...document.querySelectorAll(".die-list")];
    const sum = dice.reduce((sum, current) => sum + parseInt(current.dataset.roll), 0);
    console.log(sum);
    document.querySelector(".dice>h4").style.display = "block";
    document.querySelector("#roll-result").innerHTML = sum;
}

function whichTransitionEvent() {
    var t;
    var el = document.createElement("testElement");
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

//betting-functies
//wissel rol
function switchRole() {
    let shooterButton = document.querySelector("#shooter");
    let notShooterButton = document.querySelector("#not-shooter");
    //TODO
    resetBet();
    if (shooter) {
        shooter = false;
        notShooterButton.style.display = "block";
        shooterButton.style.display = "none";
        roll.disabled = true;
    } else {
        shooter = true
        notShooterButton.style.display = "none";
        shooterButton.style.display = "block";
        roll.disabled = true;
    }
    console.log("shooter = " + shooter);
}
//bet
function resetBet() {
    console.log("Bet reset")
    bet = null;
    document.querySelector("#PL").disabled = false;
    document.querySelector("#DPL").disabled = false;
}
function lineBetPL() {
    //shooter or not
    console.log("PL");
    bet = "PL";
    document.querySelector("#PL").disabled = true;
    document.querySelector("#DPL").disabled = false;
    roll.disabled = false;
}
function lineBetDPL() {
    //shooter or not
    console.log("DPL");
    bet = "DPL";
    document.querySelector("#PL").disabled = false;
    document.querySelector("#DPL").disabled = true;
    roll.disabled = false;
}
