from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.videos import services
from apps.videos.models import Video
from apps.videos.permissions import IsVideoOwnerOrReadOnly
from apps.videos.serializers import VideoCreateSerializer, VideoSerializer, VideoUpdateSerializer


class VideoListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        videos = Video.objects.select_related('channel')
        return Response(VideoSerializer(videos, many=True).data)

    def post(self, request):
        serializer = VideoCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        video = services.create_video(request.user, **serializer.validated_data)
        return Response(VideoSerializer(video).data, status=status.HTTP_201_CREATED)


class VideoDetailView(APIView):
    permission_classes = [IsVideoOwnerOrReadOnly]

    def get_video(self, video_id):
        video = Video.objects.select_related('channel').filter(pk=video_id).first()
        if video is None:
            raise NotFound('Відео не знайдено.')
        self.check_object_permissions(self.request, video)
        return video

    def get(self, request, video_id):
        return Response(VideoSerializer(self.get_video(video_id)).data)

    def patch(self, request, video_id):
        video = self.get_video(video_id)
        serializer = VideoUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        video = services.update_video(video, **serializer.validated_data)
        return Response(VideoSerializer(video).data)

    def delete(self, request, video_id):
        services.delete_video(self.get_video(video_id))
        return Response(status=status.HTTP_204_NO_CONTENT)
