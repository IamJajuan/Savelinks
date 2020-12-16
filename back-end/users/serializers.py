from django.contrib.auth.models import User 
from rest_framework.serializers import ModelSerializer

class UserSerializers(ModelSerializer):

    class Meta:

        model = User
        fields =  ['username']
  

