from django.urls import path
from . import views

urlpatterns = [
    path('library-store/', views.index, name='home')
]