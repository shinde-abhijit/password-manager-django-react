from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('app', views.PasswordManagerViewSet, basename='passwordmanager')


urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('api/', include('app.urls')),
]


urlpatterns += router.urls
