from django.urls import path

from apps.channels.views import ChannelCreateView, ChannelDetailView

urlpatterns = [
    path('', ChannelCreateView.as_view(), name='channel-create'),
    path('<slug:handle>/', ChannelDetailView.as_view(), name='channel-detail'),
]
