from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Note
from .serializers import UserSerializer, NoteSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom token view that uses our serializer with username in token"""

    serializer_class = CustomTokenObtainPairSerializer


class CurrentUserView(APIView):
    """Returns the current authenticated user's info"""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "id": request.user.id,
                "username": request.user.username,
            }
        )


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
