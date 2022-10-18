from django.db import models

class Game(models.Model):
    # 0 = tie, 1 = player1 wins, 2 = player2 wins
    who_wins = models.IntegerField()
    creation_time = models.DateTimeField()

