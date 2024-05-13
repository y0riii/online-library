from django.db import models

# Create your models here.
class AbstractPerson(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    class Meta:
        abstract = True

class User(AbstractPerson):
    role = models.CharField(max_length=10)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=5)

class Book(models.Model):
    title = models.CharField(max_length=50)
    describtion = models.CharField(max_length=800)
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
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Author(AbstractPerson):
    about = models.CharField(max_length=500 ,blank=True)
    books = models.ManyToManyField(Book)
