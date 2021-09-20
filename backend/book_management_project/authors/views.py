from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication

from core import models
from authors import serializers


class AuthorViewSet(viewsets.ModelViewSet):
    """ViewSet for Author """
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all()
