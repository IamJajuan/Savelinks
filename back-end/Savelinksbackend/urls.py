"""Savelinksbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from links import views
from users.views import UsersViewsets
from django.views.generic import TemplateView, RedirectView
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'links', views.LinkViewSet, basename= 'links')
router.register(r'categories',views.CategoryViewSets, basename= 'categories')
router.register(r'users',UsersViewsets,basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api-token-auth/', obtain_auth_token),
     path('', include(router.urls) ),
     path('dj-rest-auth/', include('dj_rest_auth.urls')),
     path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
