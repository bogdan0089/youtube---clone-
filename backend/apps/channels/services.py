from apps.channels.exceptions import ChannelAlreadyExists, HandleAlreadyTaken
from apps.channels.models import Channel
from apps.users.models import User


def create_channel(owner: User, handle: str, name: str, description: str = '') -> Channel:
    if Channel.objects.filter(owner=owner).exists():
        raise ChannelAlreadyExists()
    if Channel.objects.filter(handle=handle).exists():
        raise HandleAlreadyTaken()
    return Channel.objects.create(owner=owner, handle=handle, name=name, description=description)


IMAGE_FIELDS = ('avatar', 'banner')


def update_channel(channel: Channel, **data) -> Channel:
    replaced_files = [getattr(channel, field).name for field in IMAGE_FIELDS if field in data and getattr(channel, field)]
    for field, value in data.items():
        setattr(channel, field, value)
    channel.save(update_fields=list(data))
    for file_name in replaced_files:
        channel.avatar.storage.delete(file_name)
    return channel
