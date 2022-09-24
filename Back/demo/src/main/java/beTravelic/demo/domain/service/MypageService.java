//package beTravelic.demo.domain.service;
//
//import beTravelic.demo.domain.dto.MypagePictureRequestDto;
//import beTravelic.demo.domain.dto.MypagePictureResponseDto;
//import beTravelic.demo.domain.dto.MypicturesViewResponseDto;
//import beTravelic.demo.domain.entity.MypagePicture;
//
//import beTravelic.demo.domain.entity.User;
//import beTravelic.demo.domain.exception.NoExistUserException;
//import beTravelic.demo.domain.repository.MypagePictureRepository;
//import beTravelic.demo.domain.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.omg.CORBA.PUBLIC_MEMBER;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class MypageService {
//    private final UserRepository userRepository;
//    private final MypagePictureRepository mypagePictureRepository;
//
//    // 마이 페이지 지도 사진 등록 하기
////    public MypagePictureResponseDto saveMyPicture(String id, MypagePictureRequestDto dto){
////        MypagePicture mypagePicture;
////        mypagePicture = dto.toMypagePictureEntity();
////        User user = userRepository.findUserById(id).orElseThrow(() -> {
////            throw new NoExistUserException();
////        });
////        mypagePicture.setUser(user);
////        mypagePictureRepository.save(mypagePicture);
////        return new MypagePictureResponseDto(mypagePicture.getUser().getId());
////    }
//
//    // 마이페이지 지도 사진 전체 받기
//    public MypicturesViewResponseDto getMyPictures(Long id){
//        MypagePicture mypagePicture = mypagePictureRepository.findBoardById(id).orElseThrow(()->
//            new RuntimeException("일치하는 내용이 없습니다."));
//        return MypicturesViewResponseDto.of(mypagePicture);
//    }
//
//
//
//
//}
