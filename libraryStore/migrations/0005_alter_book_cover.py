# Generated by Django 5.0.6 on 2024-05-19 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libraryStore', '0004_alter_book_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='cover',
            field=models.ImageField(default='', upload_to='static/book-images'),
        ),
    ]
