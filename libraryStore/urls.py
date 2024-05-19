from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_page, name='login'),
    path('register/', views.register_page, name='register'),
    path('logout/', views.logout_page, name='logout'),
    path('about-us/', views.about_us, name='about-us'),
    path('my-books/', views.my_books, name='my-books'),
    path('add-book/', views.add_new_book, name='add-new-book'),
    path('edit-book/<str:pk>/', views.edit_book, name='edit-book'),
    path('book-details/<str:pk>/', views.book_details, name='book-details'),
    path('delete-book/<str:pk>/', views.delete_book, name='delete-book'),
]