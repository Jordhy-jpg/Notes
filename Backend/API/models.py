from django.contrib.auth.models import User
from django.db import models
# Create your models here.

class Note(models.Model):

    title = models.CharField(max_length=100)
    content = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    lastUpdated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    class Meta:
        verbose_name = ("Note")
        verbose_name_plural = ("Notes")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Note_detail", kwargs={"pk": self.pk})
