from django.db import models
from django.contrib.auth.models import User

#Create your models here.
class Dish(models.Model):
    course = models.CharField(max_length=30)
    title = models.CharField(max_length=30)
    prep = models.IntegerField()
    details = models.TextField()
    photo = models.CharField(max_length=99999)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dishes")
    
def __str__(self):
    return self.title