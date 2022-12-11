package beTravelic.demo.domain.dto;

import beTravelic.demo.domain.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class CommentSaveResponseDto {
    private Long id;


}
