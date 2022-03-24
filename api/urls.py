from .views import JoinRoom, RoomView, CreateRoomView, GetRoom, UserInRoom, LeaveRoom, UpdateRoom
from django.urls import path

urlpatterns = [
    path('', RoomView.as_view()), # call class and give view for the class
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view())

]