from rest_framework import viewsets
from .models import EmissionRecord
from .serializers import EmissionRecordSerializer


class EmissionRecordViewSet(viewsets.ModelViewSet):

    queryset = EmissionRecord.objects.all()

    serializer_class = EmissionRecordSerializer