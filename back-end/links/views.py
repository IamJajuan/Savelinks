from django.shortcuts import render,get_object_or_404
from rest_framework.parsers import JSONParser
from .serializers import LinkSerializer,CategorySerializer
from .models import Link,Category
from .utilities import handleCategory
from rest_framework.generics import ListCreateAPIView
from .parser import getData,addThumbnail
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes,action
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication,BasicAuthentication,SessionAuthentication
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter,SearchFilter,BaseFilterBackend
from django.http import QueryDict
# Create your views here.




class CategoryFilterBackend(BaseFilterBackend):
    """
    Filter that only allows users to see their own categorize objects.
    """
    def filter_queryset(self, request, queryset, view):
      
      
         
        try:
           category = request.query_params['category']
           

           querysetFilter = queryset.filter(category__name= category)
         
           return querysetFilter 
        except KeyError:
            return queryset

    
     

class HiddenLinkFilter(BaseFilterBackend):

    """
    Filter that only allows users to see their own hidden objects
    """

    def filter_queryset(self, request, queryset, view):


        try:
            hidden = request.query_params['hidden']
            isHidden = hidden == 'true' or hidden == 'true/'
            queryset = queryset.filter(hidden=True) if isHidden else queryset
            return queryset


        except KeyError:
            return queryset




class LinkViewSet(viewsets.ModelViewSet):


    serializer_class = LinkSerializer
    authentication_classes = [TokenAuthentication,SessionAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter,OrderingFilter,CategoryFilterBackend,HiddenLinkFilter]
    search_fields = ['title', 'summary']
    ordering = ['hidden','-id']


    def get_queryset(self):
         user = User.objects.get(username = self.request.user)
         queryset = Link.objects.all()

         if user.is_staff == False:
            queryset = Link.objects.filter(user = user)

         return queryset

    @action(detail=False,methods=['post'])
    def paste_link(self,serializer):
      '''
      Creates a link object
      '''
      data = getData(self.request.data['url'] ) 
      user= User.objects.get(username = self.request.user)
      obj = self.request.data
      category = handleCategory(obj, user,"category")
      data['category'] = category.pk  
      data['user'] = User.objects.get(username = self.request.user).pk
      linkSerializer = LinkSerializer(data=data)   
      if linkSerializer.is_valid():
    
            return Response(data= linkSerializer.data, status= status.HTTP_200_OK)
      return Response(linkSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def create(self, request, *args, **kwargs):
        '''
        creates and add link to database
        '''
        data = request.data.copy()
        user= User.objects.get(username = self.request.user)
        category = handleCategory(data, user,"category")
        data['category'] = category.pk 
        data['user'] = user.pk
        data['thumbnail'] =  addThumbnail(data['url']) if data['thumbnail'] else data['thumbnail']
        linkSerializer = LinkSerializer(data=data)

        if linkSerializer.is_valid():

            linkSerializer.save()
            return Response(data= linkSerializer.data, status= status.HTTP_200_OK)
        else:
            return Response(linkSerializer.errors, status=status.HTTP_400_BAD_REQUEST)



       
    def update(self, request, pk=None):


        data=  request.data.copy()
        try:

            thumbnail = None if request.data['remove'] == True else request.data['thumbnail']
            data['thumbnail'] = thumbnail 
        except KeyError:
            pass
         
        
   
        data['category'] = handleCategory(data,request.user,'category').pk
     
        
       
        link = Link.objects.get(pk = pk)
        link = LinkSerializer(link , data=data)    
      
        
        if link.is_valid():    
            
            link.save()

        
            return Response(link.data)
        return Response(link.errors, status=status.HTTP_400_BAD_REQUEST)


       
    
        
class CategoryViewSets(viewsets.ModelViewSet):

    serializer_class = CategorySerializer
    authentication_classes = [TokenAuthentication,SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

         user = User.objects.get(username = self.request.user)
         queryset = Category.objects.order_by('name')

         if user.is_staff == False:
            queryset = Category.objects.filter(user = user)

         return queryset

    def perform_create(self, serializer):
        serializer.save(user= self.request.user)

    @action(methods=['post'],detail=True)
    def getCategory(self,request,pk=None):
      

        obj = request.data         
        user = User.objects.get(username = request.user)
        obj = handleCategory(obj,user,'name')
        obj = CategorySerializer(obj)
     

        return Response(obj.data)

        




  
     
      





    




    
        


