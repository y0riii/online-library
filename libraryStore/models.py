from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=50)
    describtion = models.CharField(max_length=800)
    cover = models.CharField(max_length=100, default='')
    category_options = {
        "Self-improvement": "Self-improvement",
        "Fiction": "Fiction",
        "Romance": "Romance",
        "Scientific": "Scientific",
        "Comedy": "Comedy",
        "Drama": "Drama"
    }
    category = models.CharField(max_length=50, choices=category_options, default='Self-improvement')
    is_available = models.BooleanField(default=1)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)


class Author(User):
    about = models.CharField(max_length=500 ,blank=True, null=True)
    books = models.ManyToManyField(Book, blank=True, null=True)
