from django.db import models

TYPES = (
    (1, 'fundacja'),
    (2, 'organizacja pozarządowa'),
    (3, 'zbiórka lokalna')
)


class Category(models.Model):
    name = models.CharField(max_length=255)


class Institution(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    type_of = models.IntegerField(choices=TYPES, default=1)
    categories = models.ManyToManyField(Category)
