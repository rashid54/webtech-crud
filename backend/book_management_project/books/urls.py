from django.urls import path, include
from books import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('', views.BookViewSet)
router.register('review/', views.BookViewSet)

urlpatterns=[
    path('', include(router.urls)),
]
