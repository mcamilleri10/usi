from django.contrib import admin
from .models import F1Race

class F1Admin(admin.ModelAdmin):
    list_display = ("season", "round", "circuit", "country", "date")

admin.site.register(F1Race, F1Admin)
