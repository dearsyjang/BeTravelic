from konlpy.tag import Okt
from numpy import dot
from numpy.linalg import norm
import numpy as np

from sklearn.decomposition import TruncatedSVD
import pandas as pd
import numpy as np
import pymysql



conn = pymysql.connect(host='localhost',
                        user='root',
                        password='ssafyd205',
                        db='D205_2',
                        charset='utf8')





place_table = "SELECT * FROM place"
category_table = "SELECT * FROM place_category"
place_keywords_table = "SELECT * FROM place_keywords"
review_table = "SELECT * FROM review"
all_keywords_table = "SELECT * FROM keywords"

place_data = pd.read_sql_query(place_table, conn)
category_data = pd.read_sql_query(category_table, conn)
keywords_data = pd.read_sql_query(place_keywords_table, conn)
review_data = pd.read_sql_query(review_table, conn)
all_keywords_data = pd.read_sql_query(all_keywords_table, conn)


place_category_data = pd.merge(place_data, category_data, on='category')
place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
place_review_data = pd.merge(place_data, review_data, on='place_id')
place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')


def sns_recommendations(selected_user_id):

    place_user_score = place_review_data.pivot_table('score_y', index ='title', columns='user_id').fillna(0)
    user_place_score = place_user_score.values.T
    #print(place_user_score)

    SVD = TruncatedSVD(n_components=3)
    matrix=SVD.fit_transform(user_place_score)
    #print(matrix[0])

    corr = np.corrcoef(matrix)
    #print(corr.shape)

   
    users = place_user_score.columns
    users_list = list(users)
    coffey_hands = users_list.index(selected_user_id)
    corr_coffey_hands = corr[coffey_hands]
    return list(users[(corr_coffey_hands>=0.9)] )


#selected_user_id= 3 
#sns_recommendations(selected_user_id)


################################################################################################

# from konlpy.tag import Okt
# from numpy import dot
# from numpy.linalg import norm
# import numpy as np

# from sklearn.decomposition import TruncatedSVD
# import pandas as pd
# import numpy as np
# import pymysql



# conn = pymysql.connect(host='localhost',
#                         user='root',
#                         password='ssafyd205',
#                         db='D205_2',
#                         charset='utf8')





# place_table = "SELECT * FROM place"
# category_table = "SELECT * FROM place_category"
# place_keywords_table = "SELECT * FROM place_keywords"
# review_table = "SELECT * FROM review"
# all_keywords_table = "SELECT * FROM keywords"

# place_data = pd.read_sql_query(place_table, conn)
# category_data = pd.read_sql_query(category_table, conn)
# keywords_data = pd.read_sql_query(place_keywords_table, conn)
# review_data = pd.read_sql_query(review_table, conn)
# all_keywords_data = pd.read_sql_query(all_keywords_table, conn)


# place_category_data = pd.merge(place_data, category_data, on='category')
# place_keywords_data = pd.merge(place_data, keywords_data, on='place_id')
# place_review_data = pd.merge(place_data, review_data, on='place_id')
# place_keywords_match_data = pd.merge(place_keywords_data, all_keywords_data, on='keywords_id')


# def place_recommendations(selected_place_name):

#     user_place_score = place_review_data.pivot_table('score_y', index = 'user_id', columns='title').fillna(0)
#     place_user_score = user_place_score.values.T
#     #print(place_user_score)

#     SVD = TruncatedSVD(n_components=3)
#     matrix=SVD.fit_transform(place_user_score)
#     #print(matrix[0])

#     corr = np.corrcoef(matrix)
#     #print(corr.shape)

   
#     place_title = user_place_score.columns
#     place_title_list = list(place_title)
#     coffey_hands = place_title_list.index(selected_place_name)
#     corr_coffey_hands = corr[coffey_hands]
#     return list(place_title[(corr_coffey_hands>=0.9)])


# selected_place_name='양산문화원'
# print(sns_recommendations(selected_place_name))



