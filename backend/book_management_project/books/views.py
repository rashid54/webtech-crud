from rest_framework import viewsets

from core import models
from books.serializers import BookSerializer, ReviewSerializer


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = models.Book.objects.all()


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = models.Review.objects.all()
