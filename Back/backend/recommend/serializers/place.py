from ..models import Place,PlaceCategory,PlaceKeywords, PlaceRegion
from rest_framework import serializers



class PlaceSerializer(serializers.ModelSerializer):

    class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = PlaceCategory
            fields = '__all__'

    # class KeywordSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = PlaceKeywords
    #         fields = ('place_id', 'keywords_id')

    class RegionSerializer(serializers.ModelSerializer):
        class Meta:
            model = PlaceRegion
            fields =  '__all__'

    category = CategorySerializer(many=True, read_only=True)
    #Keywords = KeywordSerializer(many=True, read_only=True)
    region = RegionSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = '__all__'



class PlaceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = '__all__'
