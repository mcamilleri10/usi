from django.db import models


class F1Race(models.Model):
	season = models.CharField(max_length=4)
	round = models.CharField(max_length=2)
	circuit = models.CharField(max_length=240)
	country = models.CharField(max_length=240)
	date = models.DateField()

