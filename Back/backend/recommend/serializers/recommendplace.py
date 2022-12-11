from ..models import RecommendPlace
from rest_framework import serializers



class RecommendPlaceSerializer(serializers.ModelSerializer):


    class Meta:
        model = RecommendPlace
        fields = '__all__'
