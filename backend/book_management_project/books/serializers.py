from rest_framework import serializers
from core.models import Book, Review


class BookSerializer(serializers.ModelSerializer):
    """Serializer for Book Model"""
    class Meta:
        model = Book
        fields = ('id','title','price','author')
        read_only_fields = ('id',)


class ReviewSerializer(serializers.ModelSerializer):
    """Serializer for Review Model"""
    class Meta:
        model = Review
        fields = ('id','description','rating','book',)
        read_only_fields = ('id',)
