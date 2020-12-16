from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.error import HTTPError
import requests



def checkData(data):
  """
  Determine if the given data is an object
  """

  if data == None or type(data) == str:


    return False
  
  else:
    return True


def shorten(obj):
    '''
    trucate the length of the obj summary and title field
    '''

    if obj['summary'] != None:
        
        obj['summary'] = obj['summary'][:245] +'...' if len(obj['summary']) > 250  else obj['summary']
    
    if obj['title'] != None:
        
        obj['title'] =  obj['title'][:55] + '...' if  len(obj['title'])   > 60  else obj['title']


def checkThumbnail(url):
  '''
  Determine if url is vaild
  '''

  if len(url) > 200:
   return None
    
  try:
    requests.get(url)
    return url
  except:

    return None

def addThumbnail(url):
  '''
  creates a response object with the given url and returns a thumbnail url if reponse thumbnail is not null 
  '''
  res = requests.get(url)
  res = res if res.ok else requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
  img = None
  if res.ok:
        soup = BeautifulSoup(res.text, 'html.parser')
        img = soup.find('meta', attrs = { 'property':'og:image'} ) or soup.find('meta', attrs = { 'name':'og:image'} )
        if img:
           img = checkThumbnail(img['content'])
  return img

def getData(url):

    '''
    Converts given url into a reponse object, then parse the desire data and return an object contain the desire data
    '''
    res = requests.get(url)
    res = res if res.ok else requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})

    if res.ok:
        
        soup = BeautifulSoup(res.text, 'html.parser')
        img = soup.find('meta', attrs = { 'property':'og:image'} ) or soup.find('meta', attrs = { 'name':'og:image'} )
        if img:
           img = checkThumbnail(img['content'])
        try:
          title = soup.find('meta', attrs = {'property':'og:title' } ) or str(soup.find('title').string)
        except AttributeError:
          title = 'Untitled'
        
        try:
          summary = soup.find('meta', attrs = {'name':'description'}) or soup.find('meta', attrs= {"property":"og:description"})
        except:
          summary = None
   
        obj = {
      'title':title,
      'summary':summary,
      'thumbnail': img,
       'url': url
     
       }
      
        obj = {i:obj[i].get('content')  if checkData(obj[i]) else obj[i]  for i in obj}
        shorten(obj)
      
      

        return obj

 
    return {'url': url,'title':'', 'summary':'',
      'thumbnail': '',}











    

  
