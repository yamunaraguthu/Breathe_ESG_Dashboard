from rest_framework.routers import DefaultRouter
from .views import DataSourceViewSet


router = DefaultRouter()

router.register(r'datasources', DataSourceViewSet)

urlpatterns = router.urls