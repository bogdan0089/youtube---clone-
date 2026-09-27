from django.conf import settings
from django.db import models


class Channel(models.Model):
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='channel')
    handle = models.SlugField(max_length=30, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'@{self.handle}'
