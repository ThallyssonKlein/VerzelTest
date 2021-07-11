from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='VezelAPI')

from rest_framework import routers
from core import views

router = routers.DefaultRouter()
router.register(r'module/?', views.ModuleViewSet)
router.register(r'class/?', views.ClassViewSet)

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('doc/', schema_view, name='doc'),
    path('api/v1/', include(router.urls)),
    path('api/auth', obtain_auth_token, name='authentication')
]