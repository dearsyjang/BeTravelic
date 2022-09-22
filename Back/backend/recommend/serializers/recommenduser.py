from ..models import User,Place,Review,RecommendUser
from rest_framework import serializers



class RecommendUserSerializer(serializers.ModelSerializer):

    
    # class UserSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = User
    #         fields = ('user_id','nickname')

    # class ReviewSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = Review
    #         fields = ('review_id', 'contents')

    # class PlaceSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = Place
    #         fields =  'place_id'

    # user = UserSerializer(many=True, read_only=True)
    # review = ReviewSerializer(many=True, read_only=True)
    # place = PlaceSerializer(many=True, read_only=True)



    class Meta:
        model = RecommendUser
        fields = '__all__'