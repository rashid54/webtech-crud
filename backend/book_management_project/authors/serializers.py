from rest_framework import serializers
from core import models


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer of Author object"""

    class Meta:
        model = models.Author
        fields = ('id', 'name', 'description',)
        
