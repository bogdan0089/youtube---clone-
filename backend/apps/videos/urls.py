from django.urls import path

from apps.videos.views import VideoDetailView, VideoListCreateView

urlpatterns = [
    path('', VideoListCreateView.as_view(), name='video-list'),
    path('<slug:video_id>/', VideoDetailView.as_view(), name='video-detail'),
]
