from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    model = Task
    fields = '__all__'