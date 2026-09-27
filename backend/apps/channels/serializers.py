from rest_framework import serializers

from apps.channels.models import Channel


class ChannelCreateSerializer(serializers.Serializer):
    handle = serializers.SlugField(min_length=3, max_length=30)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=1000, required=False, allow_blank=True)

    def validate_handle(self, value):
        return value.lower()


class ChannelUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['name', 'description']


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['id', 'handle', 'name', 'description', 'created_at']
