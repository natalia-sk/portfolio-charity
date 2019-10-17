from django.contrib.auth.models import User
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

    @property
    def name_type_of(self):
        name_type = dict(TYPES)[self.type_of]
        return name_type


class Donation(models.Model):
    quantity = models.PositiveSmallIntegerField()
    categories = models.ManyToManyField(Category)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    address = models.CharField(max_length=64)
    phone_number = models.CharField(max_length=16, null=True, default=None)
    city = models.CharField(max_length=64)
    zip_code = models.CharField(max_length=6)
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    pick_up_comment = models.CharField(max_length=255, null=True, default=None)
    user = models.ForeignKey(User, null=True, default=None, on_delete=models.CASCADE)
