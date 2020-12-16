from .models import Link,Category
from rest_framework import serializers
from rest_framework.permissions import IsAdminUser

from rest_framework.response import Response




class LinkSerializer(serializers.ModelSerializer):


 
  class Meta:

        model = Link
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}
      

class CategorySerializer(serializers.ModelSerializer):

    class Meta:

        model = Category
        fields = '__all__'

        
  





     
    
    