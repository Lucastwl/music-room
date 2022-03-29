from django.urls import path
from .views import index

app_name = 'frontend' # to make sure redirect knows this is the app to go to

urlpatterns = [
    path('', index),
    path('join', index),
    path('home', index),
    path('about', index),
    path('create', index, name='create'),
    path('room/<str:roomCode>', index),
    path('tictactoe', index),
    path('fplpoints', index),
]