var intervalId;
var correct = 0;
var incorrect = 0;
var notAnswered  = 0;
var rightGif = "<img src='assets/images/win.gif' />";
var wrongGif = "<img src='assets/images/lose.gif' />";
var timeoutGif = "<img src='assets/images/timeout.gif' />";
var timer = 15;
var count = 0;

var questionObj = {
	bank : [
		{
			question: "michael went to the same high school as what other character?",
			ans1 : "phyllis",
			ans2 : "stanley",
			ans3 : "creed",
			ans4 : "merideth",
			correct : "ans1",
			display : "phyllis"
		},
		{
			question: "what do dwight and his cousin moe grow on schrute farms?",
			ans1 : "cabbage",
			ans2 : "beets",
			ans3 : "cucumber",
			ans4 : "sauerkraut",
			correct : "ans2",
			display : "beets"
		},
		{
			question: "michael scott drives a _____ throughout the majority of the series. ",
			ans1 : "pt cruiser",
			ans2 : "ford taurus",
			ans3 : "chrysler sebring convertible",
			ans4 : "firebird",
			correct : "ans3",
			display: "chrysler sebring convertible"
		},
		{
			question: "dunder mifflin sells what product?",
			ans1 : "software",
			ans2 : "appliances",
			ans3 : "furniture",
			ans4 : "paper",
			correct : "ans4",
			display : "paper"
		},
		{
			question: "who does michael bring with him to the sandals resort in jamaica?",
			ans1 : "ryan",
			ans2 : "dwight",
			ans3 : "jan",
			ans4 : "pam",
			correct : "ans3",
			display : "jan"
		},
		{
			question: "what town is dunder mifflin located in?",
			ans1 : "scranton",
			ans2 : "hershey",
			ans3 : "philadelphia",
			ans4 : "reading",
			correct : "ans1",
			display : "scranton"
		},
		{
			question: "what branch does jim get transferred to?",
			ans1 : "trenton",
			ans2 : "stamford",
			ans3 : "new york city",
			ans4 : "springfield",
			correct : "ans2",
			display : "stamford"
		},
		{
			question: "what does dwight volunteer as in his spare time?",
			ans1 : "animal shelter assistant",
			ans2 : "salvation army employee",
			ans3 : "deputy sheriff",
			ans4 : "alter boy",
			correct : "ans3",
			display : "deputy sheriff"
		},
		{
			question: "what position does michael scott hold in dunder mifflin?",
			ans1 : "partner",
			ans2 : "head of sales",
			ans3 : "vice president",
			ans4 : "regional manager",
			correct : "ans4",
			display : "regional manager"
		},
		{
			question: "what is the name of pam's fiancee at the start of the series?",
			ans1 : "ryan",
			ans2 : "roy",
			ans3 : "jim",
			ans4 : "darrell",
			correct : "ans2",
			display : "roy"
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
			$('#timeRemaining').text(timer);		

	intervalId = setInterval(function() {
		timer--;
		$('#timeRemaining').text(timer);		
		timeOut();
	}, 1000);
}

function timeOut() {
	if(timer === 0) {
		notAnswered++;
		$('#noAnswer').text(notAnswered);
		$("#timeRemaining, #timer").css("visibility", "hidden");
		$('#question').css("visibility", "visible").text("you ran out of time. the correct answer was: "+ questionObj.bank[count].display);
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
			$('#timeRemaining').text(timer);
		} else if (count === questionObj.bank.length){
			gameOver();
		}	
	}, 3500); 	
}
 
function gameOver() {
	$('#transition').empty();
	$("#timeRemaining, #timer, #question").css("visibility", "hidden");
	$('.ui').css("background","none").css("border", "none");
	$('.title h1').css("margin-bottom","200px").text("game over");
	$('#restart, .stats').css("visibility", "visible");
	$('#restart').on('click', function() {
		restart();
		$('#restart, .stats').css("visibility", "hidden");
	});
}

function clearTimer() {
	clearInterval(intervalId);
	timer = 15;
	count++;
}

function restart () {
	count = 0;
	timer = 15;
	correct = 0;
	incorrect = 0;
	notAnswered  = 0;
	$('.ui').css({"background":"#45c7f9", "border":"3px solid white"});
	$('.title h1').css("margin-bottom","0px").text("trivia challenge");
	$('#correct, #wrong, #noAnswer').text(0);
	clearInterval(intervalId);
	$('#timeRemaining').text(timer); // testing 0 bug
	questionLoad(questionObj.bank[count]);
	$('#question').css("visibility", "visible")
	timerReset();
}

function listener() {
	$('.choice').on('click', function() {
		$("#timeRemaining, #timer").css("visibility", "hidden");
  		if($(this).attr("id") === questionObj.bank[count].correct) {
			correct++;
			$('#correct').text(correct);
			$('#question').css("visibility", "visible").text(questionObj.bank[count].display + ' is the right answer');
			$('.choice').empty();
			$('#transition').html(rightGif);
			clearTimer();
			transition();
      	} else if ($(this).attr("id") !== questionObj.bank[count].correct) {
      		incorrect++;
      		$('#wrong').text(incorrect);
      		$('#question').css("visibility", "visible").text("that's wrong. the correct answer was: " + questionObj.bank[count].display);
			$('.choice').empty();
			$('#transition').html(wrongGif);
			clearTimer();
			transition();   		
		}
    });
}

$(document).ready(function() {
	$.each(questionObj.bank, function(index, value) {
		console.log("question " + (index + 1) + ": " + value.display);
	});
	
	$('#start').on("click", function() {
		$('#start').css("visibility", "hidden");
		$('#timer, #question, #answers').css("visibility", "visible");
		$('.button button').css("margin-top", "0");
		$('.ui').css({"background":"#45c7f9", "border":"3px solid white"});
		questionLoad(questionObj.bank[count]);
		timerReset();
		timeOut();		
		listener();	

	});
});




