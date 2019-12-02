var PlayingCards = [];
//Declare Game Variables like Number of moves and stars
var OriginalCards = ["fa fa-circle", "fa fa-car", "fa fa-cubes", "fa fa-cloud", "fa fa-envelope-open", "fa fa-plane", "fa fa-futbol-o", "fa fa-suitcase"];

var timer;
var sec = 0;
var min = 0;
var hrs = 0;
var OpenedCards = [];
var CorrectGuesses = 0;
var CountOfMoves = 0;
var NumberOfStars = 3;
//Start the game at the start of page loadGame
function LoadGame() {
    PlayingCards = OriginalCards;
    PlayingCards = OriginalCards.concat(PlayingCards);
    PlayingCards.sort(function() 
    { 
        return 0.3 - Math.random() 
    });
    sec = 0;
    min = 0;
    hrs = 0;
    OpenedCards = [];
    CorrectGuesses = 0;
    CountOfMoves = 0;
    NumberOfStars = 3;
    StopTimer();
    StartTimer();
    PopulateDeckWithCards();
    createStars();
    $('.moves').html(CountOfMoves.toString());
    $('#Win').modal('hide');
}
//We handle Card Placement here and create 16 diffrent cards with random icons positions
function PopulateDeckWithCards() {
    $(".deck").html("")
    for (var i = 0; i < 16; i++) {
        var cardName = PlayingCards[i];
        var li = "<li id = '" + i + "' onclick = 'OpenCard(&quot;" + i + "&quot;)' class = 'card'><i class = '" + cardName + "'></i></li>";
        $('.deck').append(li);
    }
}
//Every 10 or 20 clicked the cards we decrease the number of total star
function ClickCounter() {
    CountOfMoves++;
    $('.moves').html(CountOfMoves.toString());
    if(CountOfMoves == 10){
        RemoveOneStar();
    }
    if(CountOfMoves == 20){
        RemoveOneStar();
    }
}
//At the start of game reset stars to the begin of game
function createStars(){
    $(".stars").empty();
    $(".stars").append('<li><i class="fa fa-star"></i></li>');
    $(".stars").append('<li><i class="fa fa-star"></i></li>');
    $(".stars").append('<li><i class="fa fa-star"></i></li>');
    NumberOfStars=3;
}
//remove One Star
function RemoveOneStar(){
    var StarsList = $(".stars i");
    $(StarsList[NumberOfStars - 1]).removeClass("fa fa-star");
    $(StarsList[NumberOfStars - 1]).addClass("fa fa-star fa-star-o");
    NumberOfStars--;
}
//Here is the function that handle inital phase of game by clearing out all variables and reset them to the default values
function OpenCard(card) {
    var CardObject = $('#' + card);
    
    if (OpenedCards.length < 2) {
        if (DoesOpenCardsContainSameCard(card) == false && !CardObject.hasClass("match") && CorrectGuesses != 16) {
            ClickCounter();
            CardObject.addClass("show")
            CardObject.addClass("open")
            OpenedCards.push(CardObject);
            if (OpenedCards.length == 2) {
                var Card1, Card2;
                Card1 = OpenedCards[0].children()[0];
                Card2 = OpenedCards[1].children()[0];
                if (Card1.className == Card2.className) {
                    OpenedCards[0].addClass("match");
                    OpenedCards[1].addClass("match");
                    CorrectGuesses = CorrectGuesses + 2;
                    OpenedCards = [];
                } else {
                    setTimeout(ResetOpenCardsList, 500);
                }
            }
        }
    }//we show the player a Modal Message Window with his final stats of the game
    if(CorrectGuesses == 16){
        $('#Win').modal('show');
        $(".win_message").empty();
    $(".win_message").append('<h3>Score : '+ CountOfMoves +'</h3>');
    $(".win_message").append('<h3>Time : '+ document.getElementById("basicUsage").innerHTML +'</h3>');
    $(".win_message").append('<h3>Stars : '+ NumberOfStars +'</h3>');
        StopTimer();
    }
}
// Does Open Cards Contain Same Card
function DoesOpenCardsContainSameCard(card_id) {
    for (var i = 0; i < OpenedCards.length; i++) {
        if (OpenedCards[i].attr('id') == card_id) {
            return true;
        }
    }
    return false;
}
//This function ResetOpenCardsList when two unmatched cards opened so weset them and hid ree the card
function ResetOpenCardsList() {
    OpenedCards[0].removeClass("show")
    OpenedCards[0].removeClass("open")
    OpenedCards[1].removeClass("show")
    OpenedCards[1].removeClass("open")
    OpenedCards = [];
}
//this function handle the calculation of time in seconds , mins , hours
function StartTimer() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }

    var secText, minText, hrsText;
    if (sec.toString().length == 1) {
        secText = "0" + sec;
    } else {
        secText = sec;
    }
    if (min.toString().length == 1) {
        minText = "0" + min;
    } else {
        minText = min;
    }
    if (hrs.toString().length == 1) {
        hrsText = "0" + hrs;
    } else {
        hrsText = hrs;
    }
    document.getElementById("basicUsage").innerHTML = hrsText + ":" + minText + ":" + secText;
    timer = setTimeout(StartTimer, 1000);
}
//this function StopTimer
function StopTimer() {
    clearTimeout(timer);
}