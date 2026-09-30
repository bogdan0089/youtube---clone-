from rest_framework import status
from rest_framework.exceptions import APIException


class ChannelRequired(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = 'Спочатку створіть канал.'
    default_code = 'channel_required'
