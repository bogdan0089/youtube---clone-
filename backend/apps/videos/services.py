from apps.channels.models import Channel
from apps.users.models import User
from apps.videos.exceptions import ChannelRequired
from apps.videos.models import Video


def create_video(owner: User, **data) -> Video:
    channel = Channel.objects.filter(owner=owner).first()
    if channel is None:
        raise ChannelRequired()
    return Video.objects.create(channel=channel, **data)


def update_video(video: Video, **data) -> Video:
    old_thumbnail = video.thumbnail.name if 'thumbnail' in data and video.thumbnail else None
    for field, value in data.items():
        setattr(video, field, value)
    video.save(update_fields=list(data))
    if old_thumbnail:
        video.thumbnail.storage.delete(old_thumbnail)
    return video


def delete_video(video: Video) -> None:
    video.video_file.delete(save=False)
    if video.thumbnail:
        video.thumbnail.delete(save=False)
    video.delete()
