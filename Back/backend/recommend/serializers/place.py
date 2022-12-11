from ..models import Place,Categories, Regions
from rest_framework import serializers



class PlaceSerializer(serializers.ModelSerializer):

    class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = Categories
            fields = '__all__'

   
    class RegionSerializer(serializers.ModelSerializer):
        class Meta:
            model = Regions
            fields =  '__all__'

    category = CategorySerializer(many=True, read_only=True)
    region = RegionSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = '__all__'



class PlaceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = '__all__'
