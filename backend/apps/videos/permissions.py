from rest_framework.permissions import SAFE_METHODS

from apps.core.permissions import IsOwnerOrReadOnly


class IsVideoOwnerOrReadOnly(IsOwnerOrReadOnly):
    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS or obj.channel.owner_id == request.user.id
