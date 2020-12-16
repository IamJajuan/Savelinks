from django.shortcuts import render
from .serializers import UserSerializers
from django.contrib.auth.models import User
from rest_framework import viewsets 
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
from rest_framework.decorators import permission_classes,authentication_classes
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework.generics import RetrieveUpdateDestroyAPIView,ListCreateAPIView
# Create your views here.


class UsersViewsets(viewsets.ModelViewSet):


    serializer_class = UserSerializers

    def get_queryset(self):

        if IsAdminUser:

            return User.objects.all().order_by('id')
            

    
 



