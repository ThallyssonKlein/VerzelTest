from rest_framework import viewsets
from .serializers import ModuleSerializer, ClassSerializer
from .models import Module, Class
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all().order_by('name')
    serializer_class = ModuleSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'delete':
            return [IsAuthenticated()]
        else:
            return super(ModuleViewSet, self).get_permissions()


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all().order_by('name')
    serializer_class = ClassSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == 'update' or self.action == 'delete':
            return [IsAuthenticated()]
        else:
            return super(ClassViewSet, self).get_permissions()

class TestToken(APIView):
    def get_permissions(self):
        return [IsAuthenticated()]

    def get(self, request):
        content = {'message': 'Ok'}
        return Response(content)
