from . import views
from .recommendAlgo import placeRecommend 
from .recommendAlgo import snsRecommend
from .recommendAlgo import anotherRecommend


from django.urls import path

app_name='recommend'
urlpatterns = [
    #path('',views.place_view, name="places" ),
    path('user/',views.get_users, name="get_users" ),
    # path('place/<int:place_id>/',views.get_place, name="place" ),
    path('places/',views.get_places, name="get_places"),
    #path('place_recommend/<int:current_user_id>/<str:selected_category>/', placeRecommend.place_recommendations, name="place_recommendations"),
    #path('sns_recommend/<int:current_user_id>/', snsRecommend.sns_recommendations, name="sns_recommendations"),
    #path('another_recommend/<str:selected_place_name>/', anotherRecommend.another_recommendations, name="another_recommendations"),
    path('recommend_place/', views.get_recommend_places, name="recommend_places"),
]
