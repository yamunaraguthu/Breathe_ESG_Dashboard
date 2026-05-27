import pandas as pd

from rest_framework.parsers import MultiPartParser
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import DataSource
from .serializers import DataSourceSerializer

from companies.models import Company


class DataSourceViewSet(viewsets.ModelViewSet):

    queryset = DataSource.objects.all()
    serializer_class = DataSourceSerializer
    parser_classes = [MultiPartParser]


    @action(detail=False, methods=['post'])
    def upload_csv(self, request):

        csv_file = request.FILES.get('file')

        if not csv_file:
            return Response({"error": "No file uploaded"})


        df = pd.read_csv(csv_file)


        for _, row in df.iterrows():

            Company.objects.create(
                name=row['name'],
                industry=row['industry']
            )


        return Response({"message": "CSV Uploaded Successfully"})