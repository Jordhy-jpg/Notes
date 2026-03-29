from django.urls import include, path

from . import views

urlpatterns = [
    path("notes/", views.NoteListCreateView.as_view(), name="home"),
    path("notes/delete/<int:pk>", views.NoteDeleteView.as_view(), name="delete")
]
