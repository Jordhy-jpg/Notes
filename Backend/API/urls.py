from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.CreateNoteListView.as_view(), name='note-list'),
    path("delete/<int:id>/", views.DeleteNoteView.as_view(), name='note-delete')   
]
