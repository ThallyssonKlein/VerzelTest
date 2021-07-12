from rest_framework import serializers
from .models import Module, Class


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    classes = ClassSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'name', 'classes']
