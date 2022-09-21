from ..models import User,UserCategories,UserKeywords
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):

    # class CategorieSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = UserCategories
    #         fields = ('user_id', 'category_id')

    # class KeywordSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = UserKeywords
    #         fields = ('user_id', 'keywords_id')

    # categories = CategorieSerializer(many=True, read_only=True)
    # Keywords = KeywordSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'
