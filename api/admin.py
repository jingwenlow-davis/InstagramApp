from django.contrib import admin
from .models import *
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ('user',)

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Message)
admin.site.register(Location)
admin.site.register(BlockedUser)
admin.site.register(Report)
admin.site.register(Hashtag)