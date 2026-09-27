from apps.channels.exceptions import ChannelAlreadyExists, HandleAlreadyTaken
from apps.channels.models import Channel
from apps.users.models import User


def create_channel(owner: User, handle: str, name: str, description: str = '') -> Channel:
    if Channel.objects.filter(owner=owner).exists():
        raise ChannelAlreadyExists()
    if Channel.objects.filter(handle=handle).exists():
        raise HandleAlreadyTaken()
    return Channel.objects.create(owner=owner, handle=handle, name=name, description=description)


def update_channel(channel: Channel, **data) -> Channel:
    for field, value in data.items():
        setattr(channel, field, value)
    channel.save(update_fields=list(data))
    return channel
