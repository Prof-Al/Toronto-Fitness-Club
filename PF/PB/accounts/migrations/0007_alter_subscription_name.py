# Generated by Django 4.0.1 on 2022-12-09 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_customuser_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
