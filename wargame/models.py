from django.db import models

class Game(models.Model):
    # 1 = player1 wins, 2 = player2 wins, 0 = a tie
    who_wins = models.IntegerField()
    creation_time = models.DateTimeField()
    mode = models.CharField(max_length=10)

