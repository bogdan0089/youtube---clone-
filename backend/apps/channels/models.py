from pathlib import Path
from uuid import uuid4

from django.conf import settings
from django.db import models


def channel_image_path(channel, filename):
    return f'channels/{channel.pk}/{uuid4().hex}{Path(filename).suffix.lower()}'


class Channel(models.Model):
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='channel')
    handle = models.SlugField(max_length=30, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    avatar = models.ImageField(upload_to=channel_image_path, blank=True)
    banner = models.ImageField(upload_to=channel_image_path, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'@{self.handle}'
