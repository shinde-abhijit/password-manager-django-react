from django.contrib import admin
from .models import PasswordManager


class PasswordManagerAdmin(admin.ModelAdmin):
    list_display = ('website_name', 'website_url', 'username', 'email_address', 'user_password', 'select_date', 'created', 'updated')
    list_filter = ('select_date', 'email_address')

admin.site.register(PasswordManager, PasswordManagerAdmin)


