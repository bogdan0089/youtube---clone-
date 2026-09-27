from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.channels import services
from apps.channels.models import Channel
from apps.channels.serializers import ChannelCreateSerializer, ChannelSerializer, ChannelUpdateSerializer
from apps.core.permissions import IsOwnerOrReadOnly


class ChannelCreateView(APIView):
    def post(self, request):
        serializer = ChannelCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        channel = services.create_channel(request.user, **serializer.validated_data)
        return Response(ChannelSerializer(channel).data, status=status.HTTP_201_CREATED)


class ChannelDetailView(APIView):
    permission_classes = [IsOwnerOrReadOnly]

    def get_channel(self, handle):
        channel = Channel.objects.filter(handle=handle.lower()).first()
        if channel is None:
            raise NotFound('Канал не знайдено.')
        self.check_object_permissions(self.request, channel)
        return channel

    def get(self, request, handle):
        return Response(ChannelSerializer(self.get_channel(handle)).data)

    def patch(self, request, handle):
        channel = self.get_channel(handle)
        serializer = ChannelUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        channel = services.update_channel(channel, **serializer.validated_data)
        return Response(ChannelSerializer(channel).data)
