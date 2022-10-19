function getScores(){
    $.ajax({
        url: "/wargame/get-scores",
        dataType : "json",
        type: "GET",
        success: updateScores,
        error: updateError
    });
}

function updateScores(responseText){
    let scores = responseText;
    let player1Score = 0;
    let player2Score = 0;
    for (let i = 0; i < scores.length; i++){
        if (scores[i].who_wins==1){
            player1Score++;
        } else if (scores[i].who_wins==2){
            player2Score++;
        }
        $("#history").append(
            '<div>' +
            '<span>Game id: ' + scores[i].id + '</span>' + 
            '<span>Who wins: player ' + scores[i].who_wins + '</span>' + 
            '<span>Time: ' + formatDate(scores[i].time) + '</span>' + 
            '</div>'
        );
    }
    $("#stats").append(
        '<span>Player 1 scores: ' + player1Score + '</span>' + 
        '<span>Player 2 scores: ' + player2Score + '</span>'
    );
}
