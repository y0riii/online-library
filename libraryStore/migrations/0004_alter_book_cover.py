# Generated by Django 5.0.6 on 2024-05-19 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libraryStore', '0003_alter_book_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='cover',
            field=models.ImageField(default='', upload_to='book-images/'),
        ),
    ]