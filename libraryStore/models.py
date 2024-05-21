from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(max_length=50, blank=False, null=False, unique=True)

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=50, blank=False)
    describtion = models.CharField(max_length=800)
    cover = models.ImageField(default='', blank=False, upload_to='static/book-images')
    category_options = {
        "Self-improvement": "Self-improvement",
        "Fiction": "Fiction",
        "Romance": "Romance",
        "Scientific": "Scientific",
        "Comedy": "Comedy",
        "Drama": "Drama"
    }
    category = models.CharField(max_length=50, choices=category_options, default='Self-improvement', blank=False)
    is_available = models.BooleanField(default=1)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    author_name = models.CharField(max_length=50, blank=False, default='')
