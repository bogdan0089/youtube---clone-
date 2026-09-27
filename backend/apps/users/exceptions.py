from rest_framework import status
from rest_framework.exceptions import APIException


class EmailAlreadyExists(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Користувач з таким email вже існує.'
    default_code = 'email_already_exists'


class UsernameAlreadyExists(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Користувач з таким username вже існує.'
    default_code = 'username_already_exists'
