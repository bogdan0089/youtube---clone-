from rest_framework import serializers

from apps.users.models import User


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=6, max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)


class UserSerializer(serializers.ModelSerializer):
    channel_handle = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 'channel_handle']

    def get_channel_handle(self, user):
        channel = getattr(user, 'channel', None)
        return channel.handle if channel else None


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'bio']
