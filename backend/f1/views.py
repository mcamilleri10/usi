from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from rest_framework import viewsets
from .serializers import F1RaceSerializer
from .models import F1Race


class F1RaceView(viewsets.ModelViewSet):
    serializer_class = F1RaceSerializer
    queryset = F1Race.objects.all()

