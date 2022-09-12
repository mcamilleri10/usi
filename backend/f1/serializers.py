from rest_framework import serializers
from .models import F1Race


class F1RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = F1Race
        fields = ("id", "season", "round", "circuit", "country", "date")
