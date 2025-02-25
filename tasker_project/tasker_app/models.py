from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(default=False, null=True)
    is_complited = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title