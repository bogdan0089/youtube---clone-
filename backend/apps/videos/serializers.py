from django.core.validators import FileExtensionValidator
from rest_framework import serializers

from apps.channels.models import Channel
from apps.core.validators import max_file_size
from apps.videos.models import Video

VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'mkv']


class VideoChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['handle', 'name', 'avatar']


class VideoSerializer(serializers.ModelSerializer):
    channel = VideoChannelSerializer()

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'video_file', 'thumbnail', 'channel', 'created_at']


class VideoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'description', 'video_file', 'thumbnail']
        extra_kwargs = {
            'video_file': {'validators': [FileExtensionValidator(VIDEO_EXTENSIONS), max_file_size(500)]},
            'thumbnail': {'validators': [max_file_size(2)]},
        }


class VideoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'description', 'thumbnail']
        extra_kwargs = {
            'thumbnail': {'validators': [max_file_size(2)]},
        }
