from django.urls import path
from .views import linkDetail,linkCreate,TagListCreate
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'links'

