# Generated by Django 5.0.6 on 2024-05-17 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libraryStore', '0002_alter_book_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='category',
            field=models.CharField(choices=[('Self-improvement', 'Self-improvement'), ('Fiction', 'Fiction'), ('Romance', 'Romance'), ('Scientific', 'Scientific'), ('Comedy', 'Comedy'), ('Drama', 'Drama')], default='Self-improvement', max_length=50),
        ),
    ]