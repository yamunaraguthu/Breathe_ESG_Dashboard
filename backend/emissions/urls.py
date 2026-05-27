from rest_framework.routers import DefaultRouter
from .views import EmissionRecordViewSet


router = DefaultRouter()

router.register(r'emissions', EmissionRecordViewSet)

urlpatterns = router.urls