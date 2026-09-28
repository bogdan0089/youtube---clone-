from django.contrib import admin

from apps.videos.models import Video


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'channel', 'created_at']
    list_select_related = ['channel']
    search_fields = ['id', 'title', 'channel__handle']
    readonly_fields = ['id', 'created_at']

