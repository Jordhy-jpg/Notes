from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    # Need to manually create() as create_user() is special since it hashes user password
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        extra_kwargs = {
            'author': {'read_only': True}
        }
    
    # def create(self, validated_data):
    #     return Note.objects.create(**validated_data)
    # Otherwise, is unnecessary
    