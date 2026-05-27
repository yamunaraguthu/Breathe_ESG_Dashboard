from django.db import models
from emissions.models import EmissionRecord


class AuditLog(models.Model):

    emission_record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    old_value = models.TextField()

    new_value = models.TextField()

    changed_by = models.CharField(max_length=255)

    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.changed_by