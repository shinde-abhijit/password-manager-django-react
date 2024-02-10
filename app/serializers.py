from rest_framework import serializers
from . import models

class PasswordManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PasswordManager
        fields = "__all__"

