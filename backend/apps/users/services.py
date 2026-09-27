from apps.users.exceptions import EmailAlreadyExists, UsernameAlreadyExists
from apps.users.models import User


def register_user(username: str, email: str, password: str) -> User:
    if User.objects.filter(email=email).exists():
        raise EmailAlreadyExists()
    if User.objects.filter(username=username).exists():
        raise UsernameAlreadyExists()
    return User.objects.create_user(username=username, email=email, password=password)


def update_profile(user: User, **data) -> User:
    for field, value in data.items():
        setattr(user, field, value)
    user.save(update_fields=list(data))
    return user
