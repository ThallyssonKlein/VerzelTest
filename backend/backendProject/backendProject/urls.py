from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers, permissions
from core import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Verzel API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="test@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = routers.DefaultRouter()
router.register(r'module/?', views.ModuleViewSet)
router.register(r'class/?', views.ClassViewSet)

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('api/v1/', include(router.urls)),
    path('api/auth/', obtain_auth_token, name='authentication'),
    path('api/validateToken/', views.TestToken.as_view(), name='validate_token'),
    path('api/doc/v1/', schema_view.with_ui('swagger'), name='schema-swagger-ui')
]
