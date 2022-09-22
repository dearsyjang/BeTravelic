
from urllib.parse import unquote, urlencode, quote_plus
import requests
import pprint
import json
from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect, resolve_url
import ssl
import urllib.request
from django.http import HttpResponse
from django.shortcuts import render

from .models import PlaceCategory
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Place ,RecommendPlace
from .serializers.user import UserSerializer
from .serializers.place import PlaceSerializer, PlaceListSerializer
from .serializers.recommendplace import RecommendPlaceSerializer

# Create your views here.




@api_view(['GET'])
def get_users(request):
    if request.method=='GET':
        users = get_list_or_404(User)
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)



@api_view(['GET'])
def get_places(request):
    if request.method=='GET':
        places = get_list_or_404(Place)
        serializer = PlaceListSerializer(places,many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_recommend_places(request):
    if request.method=='GET':
        places = get_list_or_404(RecommendPlace)
        serializer = RecommendPlaceSerializer(places,many=True)
        return Response(serializer.data)



