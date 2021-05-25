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
//knoppen
let roll = document.getElementById("roll")
//roll-knop
roll.addEventListener("click", Roll);
//switch-knop
document.getElementById("switch").addEventListener("click", switchRole);
//place-bet knoppen
document.getElementById("PL").addEventListener("click", lineBetPL);
document.getElementById("DPL").addEventListener("click", lineBetDPL);
//reset
document.getElementById("resetknop").addEventListener("click", reset)

//reset
function reset() {
    bet = null;
    shooter = true
    document.getElementById("not-shooter").style.display = "none";
    document.getElementById("shooter").style.display = "block";
    roll.disabled = true;
    document.getElementById("PL").disabled = false;
    document.getElementById("DPL").disabled = false;
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

//betting-functies
//wissel rol
function switchRole() {
    if (shooter) {
        shooter = false;
        document.getElementById("not-shooter").style.display = "block";
        document.getElementById("shooter").style.display = "none";
        roll.disabled = false;
    } else {
        shooter = true
        document.getElementById("not-shooter").style.display = "none";
        document.getElementById("shooter").style.display = "block";
        roll.disabled = true;
    }
    console.log(shooter);
}
//bet
function lineBetPL() {
    console.log("PL");
    bet = "PL";
    document.getElementById("PL").disabled = true;
    document.getElementById("DPL").disabled = false;
    roll.disabled = false;
}
function lineBetDPL() {
    console.log("DPL");
    bet = "DPL";
    document.getElementById("PL").disabled = false;
    document.getElementById("DPL").disabled = true;
    roll.disabled = false;
}
