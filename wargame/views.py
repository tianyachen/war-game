from django.shortcuts import render
import json
from django.http import HttpResponse
from wargame.models import Game
from django.utils import timezone


def home(request):
    return render(request, 'wargame/index.html', {})

def play_game(request):
    return render(request, 'wargame/game.html', {})

def test_game(request):
    return render(request, 'wargame/test.html', {})

def score_history(request):
    return render(request, 'wargame/score_history.html', {})

def add_score(request):
    if request.method != 'POST':
        return _my_json_error_response("You must use a POST request for this operation", status=405)

    if not 'who_wins' in request.POST or not request.POST['who_wins']:
        return _my_json_error_response("You must identify who wins.", status=400)

    new_game = Game(who_wins = request.POST['who_wins'], creation_time = timezone.now())
    new_game.save()
    return end_game(new_game)

def end_game(game):
    game_status = {
        'id': game.id,
        'time': game.creation_time.isoformat(),
        'who_wins': game.who_wins,
    }
    response_json = json.dumps(game_status)
    return HttpResponse(response_json, content_type='application/json')

def get_scores(request):
    games = Game.objects.all()
    score_history = []
    for game in games:
        score_data = {
            'id': game.id, 
            'time': game.creation_time.isoformat(),
            'who_wins': game.who_wins,
        }
        score_history.append(score_data)
    response_json = json.dumps(score_history)
    return HttpResponse(response_json, content_type='application/json')

def _my_json_error_response(message, status=200):
    response_json = '{ "error": "' + message + '" }'
    return HttpResponse(response_json, content_type='application/json', status=status)