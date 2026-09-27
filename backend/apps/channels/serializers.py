from rest_framework import serializers

from apps.channels.models import Channel
from apps.core.validators import max_file_size


class ChannelCreateSerializer(serializers.Serializer):
    handle = serializers.SlugField(min_length=3, max_length=30)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=1000, required=False, allow_blank=True)

    def validate_handle(self, value):
        return value.lower()


class ChannelUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['name', 'description', 'avatar', 'banner']
        extra_kwargs = {
            'avatar': {'validators': [max_file_size(2)]},
            'banner': {'validators': [max_file_size(6)]},
        }


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['id', 'handle', 'name', 'description', 'avatar', 'banner', 'created_at']
