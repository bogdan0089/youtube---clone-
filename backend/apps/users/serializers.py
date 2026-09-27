from rest_framework import serializers

from apps.users.models import User


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=6, max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio']
