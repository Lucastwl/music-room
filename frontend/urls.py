from django.urls import path
from .views import index

app_name = 'frontend' # to make sure redirect knows this is the app to go to

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('create', index, name='create'),
    path('room/<str:roomCode>', index),
]