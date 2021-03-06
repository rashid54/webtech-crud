from django.urls import path, include
from authors import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('author', views.AuthorViewSet)

urlpatterns=[
    path('/', include(router.urls)),
]
