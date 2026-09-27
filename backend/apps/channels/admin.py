from django.contrib import admin

from apps.channels.models import Channel


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ['handle', 'name', 'owner', 'created_at']
    list_select_related = ['owner']
    search_fields = ['handle', 'name', 'owner__username']
    readonly_fields = ['created_at']
