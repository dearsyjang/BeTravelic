from ..models import User,Place,Review,RecommendUser , RecommendFeed
from rest_framework import serializers



class RecommendUserSerializer(serializers.ModelSerializer):


    class Meta:
        model = RecommendUser
        fields = '__all__'



class RecommendFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendFeed
        fields = '__all__'