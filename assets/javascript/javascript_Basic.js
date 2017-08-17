    //set variables
    var selectedOptions = [];
    var correctOptions = ["option4","option1","option3"];
    
    var easyCorrect = 0;
    var easyIncorrect = 0;
    var easyUnanswered = 0;

    var timeKeeper = {
            timer: 30,
            intervalId: "",

            runTimer: function() {
              timeKeeper.intervalId = setInterval(timeKeeper.decrement, 1000);
            },

            decrement: function(){
                timeKeeper.timer--;
                $("#timer").html("Time remaining: " + timeKeeper.timer);
                    
                if (timeKeeper.timer === 0){
                    timeKeeper.stopTimer();
                    completeFunction();
                    finalStats();
                }
            },

            stopTimer: function() {
              clearInterval(timeKeeper.intervalId);
            },
    }

    //set function for calculating correct, incorrect, unanswered
    function completeFunction(){    
        selectedOptions.push($('input[name=inlineRadioOptions1]:checked', '#question-div1').val());
        selectedOptions.push($('input[name=inlineRadioOptions2]:checked', '#question-div2').val());
        selectedOptions.push($('input[name=inlineRadioOptions3]:checked', '#question-div3').val());

        for(j=0;j<correctOptions.length;j++){
            if(selectedOptions[j] == undefined){
                easyUnanswered++;
            }
            else if(selectedOptions[j] == correctOptions[j]){
                easyCorrect++;
            }
            else if (selectedOptions[j] != correctOptions[j]){
                easyIncorrect++;
            }
        }
    }

    //set function for ending timer and displaying final stats
    function finalStats(){
        timeKeeper.stopTimer();
        timeKeeper.time=30
        $("#timer").html("Time Remaining: 30");
        $("#timer-div").attr("style","display:none");
        $("#submit-div").attr("style","display:none");
        $(".question").attr("style","display:none");
        $("#game-complete-div").attr("style","display:unset");
        $("#total-correct").html("Total Correct: " + easyCorrect);
        $("#total-incorrect").html("Total Incorrect: " + easyIncorrect);
        $("#total-unanswered").html("Total Unanswered: " + easyUnanswered);
    }

    //set function for resetting game
    function resetGame(){
        easyCorrect = 0;
        easyIncorrect = 0;
        easyUnanswered = 0;
        selectedOptions = [];
        timeKeeper.stopTimer();
        timeKeeper.timer = 30;
        $("#timer").html("Time Remaining: 30");
        $(".form-check-input").prop("checked",false);
        $("#timer-div").attr("style","display:none");
        $(".question").attr("style","display:none");
        $("#start-div").attr("style","display:unset");
        $("#game-complete-div").attr("style","display:none");
    }

    //link start button click to actions
    $("#start-button").on("click", function(){
        $("#start-div").attr("style","display:none");
        $("#timer-div").attr("style","display:unset");
        $(".question").attr("style","display:unset");
        $("#submit-div").attr("style","display:unset");
        timeKeeper.runTimer();
    });

    //link submit button click to complete game
    $("#submit-button").on("click", function(){
        completeFunction();
        finalStats();
    });

    //link restart button click to resetting game
    $("#restart-button").on("click", function(){
        resetGame();
    });


