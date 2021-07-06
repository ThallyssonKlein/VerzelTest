from rest_framework import viewsets
from .serializers import ModuleSerializer, ClassSerializer
from .models import Module, Class


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all().order_by('name')
    serializer_class = ModuleSerializer


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all().order_by('name')
    serializer_class = ClassSerializer
