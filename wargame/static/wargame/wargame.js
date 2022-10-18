function playGame(){
    return 0
}

function getScores(){
    $.ajax({
        url: "/wargame/get-scores",
        dataType : "json",
        type: "GET",
        success: updateScores,
        error: updateError
    });
}

function addScore(){
    $.ajax({
        url: "/wargame/add-scores",
        dataType : "json",
        type: "POST",
        success: endGame,
        error: updateError
    });
}

function testGame(){
    return 0
}

function updateScores(){
    return 0
}

function updateError(){
    
}