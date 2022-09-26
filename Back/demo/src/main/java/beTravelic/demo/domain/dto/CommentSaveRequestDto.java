package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Comment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class CommentSaveRequestDto {
    private String contents;

    public Comment toCommentEntity(){
        Date date = new Date();
        return Comment.builder()
                .contents(this.contents)
                .created_at(date)
                .build();
    }
}

