import secrets
import string
from pathlib import Path
from uuid import uuid4

from django.db import models

from apps.channels.models import Channel

VIDEO_ID_ALPHABET = string.ascii_letters + string.digits + '-_'


def generate_video_id():
    return ''.join(secrets.choice(VIDEO_ID_ALPHABET) for _ in range(11))


def video_upload_path(video, filename):
    return f'videos/{video.pk}/{uuid4().hex}{Path(filename).suffix.lower()}'


class Video(models.Model):
    id = models.CharField(primary_key=True, max_length=11, default=generate_video_id, editable=False)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='videos')
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=5000, blank=True)
    video_file = models.FileField(upload_to=video_upload_path)
    thumbnail = models.ImageField(upload_to=video_upload_path, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return self.title
    