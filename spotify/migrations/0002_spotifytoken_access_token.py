# Generated by Django 4.0.2 on 2022-03-01 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(default=0, max_length=150),
            preserve_default=False,
        ),
    ]
