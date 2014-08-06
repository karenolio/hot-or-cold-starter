/* MY HOT OR COLD APP */


$(document).ready(function(){
	
	/*--- Variable Declarations ---*/
	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

/*---Creating a new Game ---*/
	newGame();

/*On submit*/
$("form").submit(function(event){
	event.preventDefault(); /*This happens prior to the actual submission, so we can cancel the submit action by calling .preventDefault() on the event object or by returning false from our handler. We can trigger the event manually when another element is clicked:*/

	if (!found){
		userChoice = $("#userGuess").val();
		console.log("User choice = " + userChoice);
		clearText(); /*how does it know i want to clear that search bar?*/
		setFocus(); /*what is this for in our code?*/
		guessFlag = checkChoice(userChoice); 
			if (!guessFlag) { /*means, if guess is wrong do the following*/
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemperature(Math.abs(randomNumber - userChoice));
			};
	} else {
		setFeedback ("You won! Start a new game now!");
	};		
});

/*Create New game when you click +NEW GAME*/
$(".new").click(function(event){
	event.preventDefault();
	newGame();
});

/*newGame function - everything is cleared, everything goes back to zero*/
/*why can't I use: var newGame = function () instead of function newGame() { */
	function newGame(){ 
		guessFlag = true;
		guessCount = 0;
		found=false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber=generateNumber();
		setFocus();
		clearText();
	}
	
	/* Generate Random Number */
	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
} /*Math.floor returns x, rounded downwards to the nearest integer*/

	/*set focus to the inputbox*/
	function setFocus(){
		document.getElementById("userGuess").focus();
	}

/*clears the inputbox*/
	function clearText() {
		$("#userGuess").val('');
	}


/*set guessCount - not sure i understand the code here*/ 
	function setCount(count) {
		$('#count').text(guessCount);
	}


/*--- Prompt for User's Guess ---*/
	function getChoice() {
		var userChoice = prompt("Guess the Number","Your Guess");
		console.log("User Choice = "+ userChoice);
		return userChoice;
	}	

/*--- Check if the User's Guess meets the rules---*/
	function checkChoice(userChoice) {
		if (isNaN(userChoice)) {
			setFeedback("I accept only numbers.");
			return true;
		} else if (userChoice < 1 || userChoice > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userChoice) == '') {
			setFeedback("Enter your guess!");
			return true;
		} else {
			return false;
		};
	}

/*--- DONE: Providing temperature as feedback for user---*/
	function checkTemperature(guessDifference){

		if (guessDifference == 0) {
			setFeedback("Yay! You guessed it!!");
			found = true;
			return false;
		} else if (guessDifference <= 5) {
			setFeedback("Your Guess is getting too hot!");
			return true;
		} else if (guessDifference <= 10){
			setFeedback("Your Guess is getting hot!");
			return true;
		} else if (guessDifference>=10 && guessDifference <= 20) {
			setFeedback("Your Guess is getting Warm!");
			return true;
		} else if (guessDifference>=20 && guessDifference <= 30) {
			setFeedback("Your Guess is getting cold!");
			return true;
		} else if (guessDifference>=30 && guessDifference <= 40) {
			setFeedback("Your Guess is getting very cold!");
			return true;
		} else {
			setFeedback("Your Guess is freezing cold!");
			return true;
		}
	}

	/*--- Set the feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}


});
