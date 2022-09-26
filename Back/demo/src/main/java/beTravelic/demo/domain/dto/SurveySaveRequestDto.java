package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.*;
import beTravelic.demo.domain.service.UserService;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;

@Data
@Getter
public class SurveySaveRequestDto {

    private String   keywords;
    private Integer categories;


    public UserCategories toUserCategoriesEntity(){
        return UserCategories.builder()
                .category_num(this.categories)
                .build();
    }

    public UserKeywords toUserKeywordEntity(){
        return UserKeywords.builder()
                .keyword_name(this.keywords)
                .build();
    }
}
