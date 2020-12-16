from django.db import models
from django.contrib.auth.models import User
# Create your models here.






class Link(models.Model):

    url = models.URLField( max_length= 400 ,null =True ,blank=True)
    title = models.CharField(max_length= 60 , null=True , blank =True)
    summary = models.TextField(max_length= 250 , null =True , blank= True)
    thumbnail = models.URLField(max_length= 400 ,null =True , blank =True)
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    hidden = models.BooleanField(default=False)
    category = models.ForeignKey('Category',on_delete=models.SET_NULL,related_name= 'links',null=True,blank =True)
 

    def __str__(self):
        return self.title

    

    
class Category(models.Model):

    name = models.CharField(max_length = 60 )
    user = models.ForeignKey('auth.User',on_delete=models.CASCADE,blank =True)


    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
   



    

