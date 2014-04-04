// JavaScript Document

// Objects Needed for this exercise
var cola = { value: 100, total: 5 };
var candy = { value: 65, total: 5 };
var chips = { value: 50, total: 5 };
var coinQ = { weight: 25 };
var coinK = { weight: 15 };
var coinP = { weight: 10 };
var coinD = { weight: 5 };

// Variables to keep track of machine change
var totalQuarters = 10; 
var totalKnickels = 10; 
var totalDimes = 10; 
var changeTotal = 0;

// Variables to keep track of inserted change
var insertedTotal = 0;
var insertedQuarters = 0; 
var insertedKnickels = 0; 
var insertedDimes = 0; 


//Init Function
$(init);
function init(){
	checkChange();
	// Button Handlers
	$("#insertQuarter").click(function() { insertCoin(coinQ); });
	$("#insertDime").click(function()    { insertCoin(coinD); });
	$("#insertKnickel").click(function() { insertCoin(coinK); });
	$("#insertPenny").click(function()   { insertCoin(coinP); });
	//-----------------------------------------------------------
	$("#buyPop").click(function()   { buyPop(); });
	$("#buyCandy").click(function() { buyCandy(); });
	$("#buyChips").click(function() { buyChips(); });
	//-----------------------------------------------------------
	$("#getChange").click(function() { changeReturn(); });
}

// Function to Update the Display
function updateDisplay(display){
	$("#display").html(display);
}

// First process - check how much change and set display accordingly
function checkChange() {
	if(totalKnickels == 0){
		updateDisplay("EXACT CHANGE ONLY");
	} else {
		updateDisplay("INSERT COINS");
	}
}

// Function for receiving coins from customer
function insertCoin(coin){
	$("#changeReturn").html(" "); // clears the change return
	if(coin.weight != 10){ // doesn't accept pennies
		switch(coin.weight) // Figure out if it's Quarter, Knickle, or Dime by weight
		{
		case 25:
		  insertedQuarters++;
		  insertedTotal = insertedTotal + 25;
		  break;
		case 15:
		  insertedKnickels++;
		  insertedTotal = insertedTotal + 5;
		  break;
		case 5:
		  insertedDimes++;
		  insertedTotal = insertedTotal + 10;
		  break;
		default:
		  alert("Error");
		}
		updateDisplay(insertedTotal);
	} else {
		$("#changeReturn").html(".1"); //Instantly return any pennies
	}
}

// Function to buy Pop
function buyPop(){
	if(cola.total == 0){ // check if product is empty
		updateDisplay("SOLD OUT");
	} else {
		if(insertedTotal >= 100){
			collectCoins();
			dispenseProduct("POP");
			cola.total--;
			changeTotal = insertedTotal - 100;
			changeReturn();
		} else {
			updateDisplay("PRICE = $1.00");
		}
	}
}

// Function to buy Candy
function buyCandy(){
	if(candy.total == 0){ // check if product is empty
		updateDisplay("SOLD OUT");
	} else {
		if(insertedTotal >= 65){
			collectCoins();
			dispenseProduct("CANDY");
			candy.total--;
			changeTotal = insertedTotal - 65;
			changeReturn();
		} else {
			updateDisplay("PRICE = $.65");
		}
	}
}

// Function to buy Chips
function buyChips(){
	if(chips.total == 0){ // check if product is empty
		updateDisplay("SOLD OUT");
	} else {
		if(insertedTotal >= 50){
			collectCoins();
			dispenseProduct("CHIPS");
			chips.total--;
			changeTotal = insertedTotal - 50;
			changeReturn();
		} else {
			updateDisplay("PRICE = $.50");
		}
	}
}

// Collect Coins - called after a purchase is made to update machine coin total
function collectCoins(){
	while(insertedQuarters > 0) {
		totalQuarters++;
		insertedQuarters--;
	}
	while(insertedDimes > 0) {
		totalDimes++;
		insertedDimes--;
	}
	while(insertedKnickels > 0) {
		totalKnickels++;
		insertedKnickels--;
	}
}

// Function to return change
function changeReturn() {
	// Customer Want's Change Back without purchase
	$("#changeReturn").html(" "); // clears the change return
	while(insertedQuarters > 0) {
		insertedQuarters--;
		$("#changeReturn").append(" .25"); // return quarters
	}
	while(insertedDimes > 0) {
		insertedDimes--;
		$("#changeReturn").append(" .10"); // return dimes
	}
	while(insertedKnickels > 0) {
		insertedKnickels--;
		$("#changeReturn").append(" .5"); // return knickles
	}

	// break down the change needed by largest denomination
	var numOfQuarters = Math.floor(changeTotal / 25);
	changeTotal = changeTotal - (numOfQuarters * 25)
	var numOfDimes = Math.floor(changeTotal / 10);
	changeTotal = changeTotal - (numOfDimes * 10);
	var numOfKnicles = Math.floor(changeTotal / 5);
	changeTotal = changeTotal - (numOfKnicles * 5);

	while(numOfQuarters > 0) {
		numOfQuarters--;
		$("#changeReturn").append(" .25"); // return quarters
	}
	while(numOfDimes > 0) {
		numOfDimes--;
		$("#changeReturn").append(" .10"); // return dimes
	}
	while(numOfKnicles > 0) {
		numOfKnicles--;
		$("#changeReturn").append(" .5"); // return knickles
	}

	insertedTotal = 0;
	checkChange(); // reset vending machine program
}

// Function to dispense product to customer
function dispenseProduct(item){
	$("#productReturn").html(item);
}