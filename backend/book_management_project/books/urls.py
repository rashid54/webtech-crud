from django.urls import path, include
from books import views
from rest_framework.routers import DefaultRouter

app_name = "book"

# router = DefaultRouter()
# router.register('review/', views.ReviewViewSet)
# router.register('book/', views.BookViewSet)
#
# urlpatterns=[
#     path('allbook/', include(router.urls)),
# ]


bookRouter = DefaultRouter()
bookRouter.register('', views.BookViewSet)

reviewRouter = DefaultRouter()
reviewRouter.register('', views.ReviewViewSet)

urlpatterns=[
    path('book/', include(bookRouter.urls)),
    path('review/', include(reviewRouter.urls)),
]
