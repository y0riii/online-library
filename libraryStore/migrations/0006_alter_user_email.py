# Generated by Django 5.0.6 on 2024-05-21 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libraryStore', '0005_alter_book_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=50, unique=True),
        ),
    ]
