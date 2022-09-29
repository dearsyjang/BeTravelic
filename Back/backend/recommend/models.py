from django.db import models




class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    nickname = models.CharField(max_length=16)
    email = models.CharField(max_length=32)
    image = models.CharField(max_length=500)
    id= models.CharField(max_length=45)
    pw = models.CharField(max_length=45)
    refresh_token = models.CharField(max_length=500)
    class Meta:
        managed = False
        db_table = 'user'


class RecommendPlace(models.Model):
    recommend_id = models.IntegerField(primary_key=True)
    place_id = models.ForeignKey('Place', models.DO_NOTHING, db_column='place_id', blank=True, null=True)
    addr = models.CharField(max_length=45)
    title = models.CharField(max_length=45)
    image = models.CharField(max_length=500)
    mapx = models.CharField(max_length=45)
    mapy = models.CharField(max_length=45)
    score = models.IntegerField()
    overview = models.CharField(max_length=500)

    class Meta:
        managed = False
        db_table = 'recommendplace'

class Place(models.Model):
    place_id = models.IntegerField(primary_key=True)
    addr = models.CharField(max_length=45)
    title = models.CharField(max_length=45)
    image = models.CharField(max_length=500)
    mapx = models.CharField(max_length=45)
    mapy = models.CharField(max_length=45)
    score = models.IntegerField()
    content_id = models.IntegerField()
    overview = models.CharField(max_length=500)
    region_id = models.ForeignKey('Regions', models.DO_NOTHING, db_column='region_id', blank=True, null=True)
    category_id = models.ForeignKey('Categories', models.DO_NOTHING, db_column='category_id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'place'

class UserPlace(models.Model):
    visited_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    place_id = models.ForeignKey('Place', models.DO_NOTHING, db_column='place_id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_place'





class Picture(models.Model):
    picture_id = models.IntegerField(primary_key=True)
    image = models.CharField(max_length=500)
    region_id = models.ForeignKey('Regions', models.DO_NOTHING, db_column='region_id', blank=True, null=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'picture'


class Categories(models.Model):
    category = models.IntegerField(primary_key=True)
    category_name = models.CharField(max_length=45)
    content_type_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'categories'




class Regions(models.Model):
    region_id = models.IntegerField(primary_key=True)
    area_code = models.IntegerField()
    do_gwangyuksi = models.CharField(max_length=45)
    class Meta:
        managed = False
        db_table = 'regions'


class Review(models.Model):
    review_id = models.IntegerField(primary_key=True)
    contents = models.CharField(max_length=200)
    image = models.CharField(max_length=255)
    score = models.IntegerField()
    created_at = models.DateTimeField()
    visited_at = models.CharField(max_length=45)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    place_id = models.ForeignKey('Place', models.DO_NOTHING, db_column='place_id', blank=True, null=True)
    region_id = models.ForeignKey('Regions', models.DO_NOTHING, db_column='region_id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class Reviewlike(models.Model):
    like_id = models.IntegerField(primary_key=True)
    review_id = models.ForeignKey('Review', models.DO_NOTHING, db_column='review_id', blank=True, null=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reviewLike'






class Bookmark(models.Model):
    bookmark_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    place_id = models.ForeignKey('Place', models.DO_NOTHING, db_column='place_id', blank=True, null=True)
    region_id= models.ForeignKey('Regions', models.DO_NOTHING, db_column='region_id', blank=True, null=True)

    class Meta:
        managed = False      
        db_table = 'bookmark'


class Comment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    contents = models.CharField(max_length=100)       
    created_at = models.DateTimeField()
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    review_id = models.ForeignKey('Review', models.DO_NOTHING, db_column='review_id', blank=True, null=True)

    class Meta:
        managed = False     
        db_table = 'comment'



class Survey(models.Model):
    Survey_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    surveycategory = models.CharField(max_length=45)
    surveykeyword =  models.CharField(max_length=45)    

    class Meta:
        managed = False
        db_table = 'Survey'  


class Follow(models.Model):
    follow_id = models.IntegerField(primary_key=True)
    follower_user_id = models.ForeignKey('User', models.DO_NOTHING, related_name="follower_user" )
    following_user_id = models.ForeignKey('User', models.DO_NOTHING, related_name="following_user")

    class Meta:
        managed = False
        db_table = 'follow'


class RecommendFeed(models.Model):
    recommend_feed_id = models.IntegerField(primary_key=True)
    contents = models.CharField(max_length=500, blank=True, null=True)
    image_x = models.CharField(max_length=500, blank=True, null=True)
    image_y = models.CharField(max_length=500, blank=True, null=True)
    nickname = models.CharField(max_length=45, blank=True, null=True)
    created_at = models.CharField(max_length=45)
    visited_at = models.CharField(max_length=45)
    review_id = models.ForeignKey('Review', models.DO_NOTHING, db_column='review_id', blank=True, null=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    place_id = models.ForeignKey('Place', models.DO_NOTHING, db_column='place_id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recommendfeed'

class RecommendUser(models.Model):
    recommend_user_id = models.IntegerField(primary_key=True)
    image = models.CharField(max_length=500, blank=True, null=True)
    nickname = models.CharField(max_length=45, blank=True, null=True)
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='user_id', blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'recommenduser'
########################################################################################################################

# class User(models.Model):
#     user_id = models.IntegerField(primary_key=True)
#     nickname = models.CharField(max_length=16)
#     email = models.CharField(max_length=32)
#     image = models.CharField(max_length=500)

#     class Meta:
#         managed = False
#         db_table = 'user'

# class Follow(models.Model):
#     follow_id = models.IntegerField(primary_key=True)
#     following_user_id = models.IntegerField()
#     follower_user_id = models.IntegerField()
#     user_id = models.ManyToManyField(User,  related_name="follow_user")

#     class Meta:
#         managed = False
#         db_table = 'follow'


# class Keywords(models.Model):
#     keywords_id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=45)

#     class Meta:
#         managed = False
#         db_table = 'place_keywords'


# class Categories(models.Model):
#     category_id = models.IntegerField(primary_key=True)
#     category_name = models.CharField(max_length=45)
#     content_type_id = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'place_category'

# class Region(models.Model):
#     region_id = models.IntegerField(primary_key=True)
#     area_code = models.IntegerField()
#     do_gwangyuksi = models.CharField(max_length=45)

#     class Meta:
#         managed = False
#         db_table = 'place_region'



# class Place(models.Model):
#     place_id = models.IntegerField(primary_key=True)
#     addr = models.CharField(max_length=45)
#     title = models.CharField(max_length=45)
#     image = models.CharField(max_length=500)
#     mapx = models.CharField(max_length=45)
#     mapy = models.CharField(max_length=45)
#     score = models.IntegerField()
#     content_id = models.IntegerField()
#     overview = models.CharField(max_length=500)
#     region = models.ManyToManyField(Region,  related_name="place_region")
#     category = models.ManyToManyField(Categories,  related_name="place_category")

#     class Meta:
#         managed = False
#         db_table = 'place'


# class Bookmark(models.Model):
#     bookmark_id = models.IntegerField(primary_key=True)
#     user_id = models.ManyToManyField(User,  related_name="bookmark_user")
#     place_id = models.ManyToManyField(Place,  related_name="bookmark_place")

#     class Meta:
#         managed = False
#         db_table = 'bookmark'


# class Review(models.Model):
#     review_id = models.IntegerField(primary_key=True)
#     contents = models.CharField(max_length=200)
#     image = models.CharField(max_length=500)
#     score = models.IntegerField()
#     created_at = models.DateTimeField()
#     visited_at = models.CharField(max_length=45)
#     user_id = models.ManyToManyField(User,  related_name="review_user")
#     place_id = models.ManyToManyField(Place,  related_name="review_place")

#     class Meta:
#         managed = False
#         db_table = 'review'



# class Comment(models.Model):
#     comment_id = models.IntegerField(primary_key=True)
#     contents = models.CharField(max_length=100)
#     created_at = models.DateTimeField()
#     user_id = models.ManyToManyField(User,  related_name="comment_user")
#     review_id = models.ManyToManyField(Review,  related_name="comment_review")

#     class Meta:
#         managed = False
#         db_table = 'comment'







# class Picture(models.Model):
#     picture_id = models.IntegerField(primary_key=True)
#     image = models.CharField(max_length=500)
#     region_id = models.ManyToManyField(Region,  related_name="picture_region")
#     user_id = models.ManyToManyField(User,  related_name="picture_user")

#     class Meta:
#         managed = False
#         db_table = 'picture'




# class PlaceKeywords(models.Model):
#     place_keywords_id = models.IntegerField(primary_key=True)
#     keywords_id = models.ManyToManyField(Keywords,  related_name="placekeywords_keywords")
#     place_id = models.ManyToManyField(Place,  related_name="placekeywords_place")

#     class Meta:
#         managed = False
#         db_table = 'place_keywords'






# class Reviewlike(models.Model):
#     like_id = models.IntegerField(primary_key=True)
#     review_id = models.ManyToManyField(Review,  related_name="reviewlike_review")
#     user_id = models.ManyToManyField(User,  related_name="reviewlike_user")

#     class Meta:
#         managed = False
#         db_table = 'reviewlike'





# class UserCategories(models.Model):
#     user_categories_id = models.IntegerField(primary_key=True)
#     category_id = models.ManyToManyField(Categories,  related_name="usercategories_category")
#     user_id = models.ManyToManyField(User,  related_name="usercategories_user")

#     class Meta:
#         managed = False
#         db_table = 'user_categories'


# class UserKeywords(models.Model):
#     user_keywords_id = models.IntegerField(primary_key=True)
#     user_id = models.ManyToManyField(User,  related_name="userkeywords_user")
#     keywords_id = models.ManyToManyField(Keywords,  related_name="userkeywords_keywords")

#     class Meta:
#         managed = False
#         db_table = 'user_keywords'


# class UserPlace(models.Model):
#     visited_id = models.IntegerField(primary_key=True)
#     user_id = models.ManyToManyField(User,  related_name="userplace_user")
#     place_id = models.ManyToManyField(Place,  related_name="userplace_place")

#     class Meta:
#         managed = False
#         db_table = 'user_place'