from django.db import models
from companies.models import Company
from ingestion.models import DataSource


class EmissionRecord(models.Model):

    CATEGORY_CHOICES = (
        ('Scope1', 'Scope1'),
        ('Scope2', 'Scope2'),
        ('Scope3', 'Scope3'),
    )

    APPROVAL_CHOICES = (
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    )

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    datasource = models.ForeignKey(DataSource, on_delete=models.CASCADE)

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    activity_type = models.CharField(max_length=255)

    amount = models.FloatField()

    unit = models.CharField(max_length=50)

    emission_value = models.FloatField()

    date = models.DateField()

    suspicious_flag = models.BooleanField(default=False)

    approval_status = models.CharField(
        max_length=50,
        choices=APPROVAL_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.activity_type