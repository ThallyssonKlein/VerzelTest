from rest_framework import viewsets
from .serializers import ModuleSerializer, ClassSerializer
from .models import Module, Class
from .jsonresponse import JsonResponse
from rest_framework import status


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all().order_by('name')
    serializer_class = ModuleSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return JsonResponse(data=serializer.data, count=queryset.count(), status=status.HTTP_200_OK)


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all().order_by('name')
    serializer_class = ClassSerializer
