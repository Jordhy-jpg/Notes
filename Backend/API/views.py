from django.contrib.auth.models import User
from .models import Note
from .serializers import UserSerializer, NoteSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated


# Create your views here.
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class NoteListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
class NoteDeleteView(generics.DestroyAPIView):
    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    