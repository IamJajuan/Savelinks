from .models import Category, Link



def checkKey(obj,key):
    '''
    Check if key exist in obj.
    '''
    return key in obj.keys()


def isCategoryVaild(obj,key):
    '''
    Determine if categories is vaild by using the obj[key] parameter
    '''

    if checkKey(obj,key):    
        
        return obj[key].strip() != '' 

    else:
        False


def handleCategory(obj,user,key):
    '''
    get or create a Category with obj[key] and user parameter
    '''


    if isCategoryVaild(obj,key):
        
        category = Category.objects.filter(name = obj[key], user = user).first()

        if category:
            return category
        
        else:
            category = Category.objects.create(name= obj[key].strip(),user = user)
            return category
    else:

       category = Category.objects.filter(name='uncategorized',user = user).first()
       return  category if category else Category.objects.create(name='uncategorized',user = user)




