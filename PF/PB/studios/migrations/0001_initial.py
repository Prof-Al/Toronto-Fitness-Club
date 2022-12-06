# Generated by Django 4.1.2 on 2022-11-18 17:16

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import studios.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
                ('quantity', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, max_length=200, verbose_name='description')),
                ('coach', models.CharField(blank=True, max_length=200)),
                ('keywords', models.CharField(blank=True, max_length=200)),
                ('capacity', models.PositiveIntegerField(blank=True, default=0, verbose_name='default capacity')),
                ('start_date', models.DateField(default=django.utils.timezone.now, validators=[studios.models.validate_date])),
                ('end_date', models.DateField(default=django.utils.timezone.now, validators=[studios.models.validate_date])),
                ('recurring', models.PositiveIntegerField(default=7, verbose_name='Recurring days')),
                ('range', models.PositiveIntegerField(default=0, verbose_name='Total days')),
                ('time_from', models.TimeField(default=django.utils.timezone.now, verbose_name='From')),
                ('time_end', models.TimeField(default=django.utils.timezone.now, verbose_name='End')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='default.jpg', upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.TextField(max_length=200, verbose_name='Address')),
                ('postal_code', models.CharField(max_length=200, verbose_name='Postal Code')),
                ('phone_number', models.CharField(max_length=200, verbose_name='Phone Number')),
                ('latitude', models.FloatField(blank=True, editable=False, null=True, validators=[django.core.validators.MinValueValidator(-90.0), django.core.validators.MaxValueValidator(90.0)])),
                ('longitude', models.FloatField(blank=True, editable=False, null=True, validators=[django.core.validators.MinValueValidator(-180.0), django.core.validators.MaxValueValidator(180.0)])),
            ],
        ),
        migrations.CreateModel(
            name='Time',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_from', models.DateTimeField(verbose_name='From')),
                ('date_end', models.DateTimeField(verbose_name='End')),
                ('capacity', models.PositiveIntegerField(blank=True, default=0)),
                ('studio_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Times', to='studios.class')),
            ],
        ),
        migrations.AddConstraint(
            model_name='studio',
            constraint=models.CheckConstraint(check=models.Q(('latitude__gte', -90.0), ('latitude__lte', 90.0)), name='lat_range'),
        ),
        migrations.AddConstraint(
            model_name='studio',
            constraint=models.CheckConstraint(check=models.Q(('longitude__gte', -180.0), ('longitude__lte', 180.0)), name='lng_range'),
        ),
        migrations.AddField(
            model_name='image',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Image', to='studios.studio'),
        ),
        migrations.AddField(
            model_name='class',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Class', to='studios.studio'),
        ),
        migrations.AddField(
            model_name='amenity',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Amenity', to='studios.studio'),
        ),
    ]
