var intervalId;
var correct = 0;
var incorrect = 0;
var notAnswered  = 0;
var rightGif = "<img src='assets/images/win.gif' />";
var wrongGif = "<img src='assets/images/lose.gif' />";
var timeoutGif = "<img src='assets/images/timeout.gif' />";
var timer = 5;
var count = 0;

var questionObj = {
	bank : [
		{
			question: "Question 1",
			ans1 : "q1: answer 1",
			ans2 : "q1: answer 2",
			ans3 : "q1: answer 3",
			ans4 : "q1: answer 4",
			correct : "ans1"
		},
		{
			question: "Question 2",
			ans1 : "q2: answer 1",
			ans2 : "q2: answer 2",
			ans3 : "q2: answer 3",
			ans4 : "q2: answer 4",
			correct : "ans2"
		},
		{
			question: "Question 3",
			ans1 : "q3: answer 1",
			ans2 : "q3: answer 2",
			ans3 : "q3: answer 3",
			ans4 : "q3: answer 4",
			correct : "ans3"
		},
		{
			question: "Question 4",
			ans1 : "q4: answer 1",
			ans2 : "q4: answer 2",
			ans3 : "q4: answer 3",
			ans4 : "q4: answer 4",
			correct : "ans4"
		}
	]
}

function questionLoad(qObjIndex) { //index from array in questionObj
	$('#question').text(qObjIndex.question);
	$('#ans1').text(qObjIndex.ans1);
	$('#ans2').text(qObjIndex.ans2);
	$('#ans3').text(qObjIndex.ans3);
	$('#ans4').text(qObjIndex.ans4);
	$('#timeRemaining, #timer').css("visibility", "visible");
}

function timerReset(){
	intervalId = setInterval(function() {
		timer--;
		$('#timeRemaining').text(timer);
		timeOut();
	}, 500);
}

function timeOut() {
	if(timer === 0) {
		notAnswered++;
		$('#noAnswer').text(notAnswered);
		$("#timeRemaining, #timer").css("visibility", "hidden");
		$('#question').text("You ran out of time. The correct answer was "+ questionObj.bank[count].correct);
		$('.choice').empty();
		$('#transition').html(timeoutGif);
		clearTimer();
		transition();		
	}
}

function transition() {
	setTimeout(function() {
		$('#transition').empty();
		if(count < questionObj.bank.length) {
			questionLoad(questionObj.bank[count]);
			timerReset();
		} else if (count === questionObj.bank.length){
			gameOver();
		}	
	}, 3000); 	
}
 
function gameOver() {
	$('#transition').empty();
	$('#question').text("GAME OVER");
	$("#timeRemaining, #timer").css("visibility", "hidden");
	$('#restart, .stats').css("visibility", "visible");
	$('#restart').on('click', function() {
		restart();
		$('#restart, .stats').css("visibility", "hidden");
	});
}

function clearTimer() {
	clearInterval(intervalId);
	timer = 5;
	count++;
}

function restart () {
	count = 0;
	timer = 5;
	correct = 0;
	incorrect = 0;
	notAnswered  = 0;
	$('#correct, #wrong, #noAnswer').text(0);
	clearInterval(intervalId);
	questionLoad(questionObj.bank[count]);
	timerReset();
}

function listener() {
	$('.choice').on('click', function() {
		$("#timeRemaining, #timer").css("visibility", "hidden");
  		if($(this).attr("id") === questionObj.bank[count].correct) {
			correct++;
			$('#correct').text(correct);
			$('#question').text(questionObj.bank[count].correct + ' is the right answer');
			$('.choice').empty();
			$('#transition').html(rightGif);
			clearTimer();
			transition();
      	} else if ($(this).attr("id") !== questionObj.bank[count].correct) {
      		incorrect++;
      		$('#wrong').text(incorrect);
      		$('#question').text("That's wrong. The correct answer was: " + questionObj.bank[count].correct);
			$('.choice').empty();
			$('#transition').html(wrongGif);
			clearTimer();
			transition();   		
		}
    });
}

$(document).ready(function() {
	$('#start').on("click", function() {
		$('#start').css("visibility", "hidden");
		$('#timer, #question, #answers').css("visibility", "visible");
		questionLoad(questionObj.bank[count]);
		timerReset();
		timeOut();		
		listener();	
	});
});



