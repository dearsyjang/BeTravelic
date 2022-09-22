# Generated by Django 4.1.1 on 2022-09-21 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommend', '0002_recommendplace'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecommendUser',
            fields=[
                ('recommend_user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('contents', models.CharField(blank=True, max_length=500, null=True)),
                ('image_x', models.CharField(blank=True, max_length=500, null=True)),
                ('image_y', models.CharField(blank=True, max_length=500, null=True)),
                ('nickname', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'recommenduser',
                'managed': False,
            },
        ),
    ]
