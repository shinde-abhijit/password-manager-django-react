from rest_framework import viewsets
from . import serializers
from . import models

# Create your views here.
class PasswordManagerViewSet(viewsets.ModelViewSet):
    queryset = models.PasswordManager.objects.all()
    serializer_class = serializers.PasswordManagerSerializer