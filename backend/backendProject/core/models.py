from django.db import models
from django.contrib import admin

class Module(models.Model):
    name = models.CharField(max_length=50)

class Class(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateTimeField()
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='classes')

admin.site.register(Module)
admin.site.register(Class)