from rest_framework import status
from rest_framework.exceptions import APIException


class ChannelAlreadyExists(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'У вас вже є канал.'
    default_code = 'channel_already_exists'


class HandleAlreadyTaken(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Цей handle вже зайнятий.'
    default_code = 'handle_already_taken'
