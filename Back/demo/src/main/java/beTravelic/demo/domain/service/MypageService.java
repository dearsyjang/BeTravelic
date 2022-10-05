package beTravelic.demo.domain.service;

import beTravelic.demo.domain.dto.MypagePictureResponseDto;
import beTravelic.demo.domain.dto.MypagePictureViewDto;
import beTravelic.demo.domain.dto.MypageUpdateResponseDto;
import beTravelic.demo.domain.entity.MypagePicture;
import beTravelic.demo.domain.entity.Picture;
import beTravelic.demo.domain.entity.Region;
import beTravelic.demo.domain.entity.User;

import beTravelic.demo.domain.repository.MypagePictureRepository;
import beTravelic.demo.domain.repository.RegionRepository;
import beTravelic.demo.domain.repository.UserRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MypageService {
    private final UserRepository userRepository;
    private final PictureService pictureService;
    private final RegionRepository regionRepository;
    private final MypagePictureRepository mypagePictureRepository;
    private File convertMultiPartToFile(MultipartFile file ) throws IOException
    {
        File convFile = new File( file.getOriginalFilename() );
        FileOutputStream fos = new FileOutputStream( convFile );
        fos.write( file.getBytes() );
        fos.close();
        return convFile;
    }
    @Value("${path.image:/image/}")
    private String IMAGE_PATH;

    public MypagePictureResponseDto mypagePictureSave(String id, MultipartFile mypagePicture, Long region_id) throws Exception {
        String keyFileName = "";
        InputStream keyFile = ResourceUtils.getURL("classpath:static/civil-forge-364402-29986bfb28c2.json").openStream();

        Storage storage = StorageOptions.newBuilder().setProjectId("BeTravelic")
                // Key 파일 수동 등록
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build().getService();


        Picture picture = null;
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));

        String fileName = UUID.randomUUID().toString();
        String contentType = mypagePicture.getContentType();
        File file = null;
        if(contentType.contains("image/jpeg")){
            file = new File(IMAGE_PATH + fileName + ".jpg");
            picture = Picture.builder().fileName(fileName).realFileName("https://storage.googleapis.com/be_travelic/"+fileName + ".jpg").build();
        }else if(contentType.contains("image/png")){
            file = new File(IMAGE_PATH + fileName + ".png");
            picture = Picture.builder().fileName(fileName).realFileName("https://storage.googleapis.com/be_travelic/"+fileName + ".png").build();
        }else if(contentType.contains("image/gif")){
            file = new File(IMAGE_PATH + fileName + ".gif");
            picture = Picture.builder().fileName(fileName).realFileName("https://storage.googleapis.com/be_travelic/"+fileName + ".gif").build();
        }else{
            new RuntimeException("지원하는 사진 형식이 아닙니다");
        }
        File convertFile = convertMultiPartToFile( mypagePicture );
        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder("be_travelic", picture.getRealFileName())
                        .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                        .build());

        Blob blob = storage.createFrom(blobInfo, new FileInputStream(convertFile));

        Region region = regionRepository.findRegionByRegionId(region_id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));

        MypagePicture myPicture = new MypagePicture();
        myPicture.setUser(user);
        myPicture.setFileName(picture.getFileName());
        myPicture.setRealFileName(picture.getRealFileName());
        myPicture.setRegion(region);

        mypagePictureRepository.save(myPicture);

        return MypagePictureResponseDto.of(region_id, picture.getRealFileName(), user.getUser_id());
    }

//    public List<MypagePicture> getMypagePictures(String id) {
//        List<MypagePicture> mypagePictures = mypagePictureRepository.findMypagePicturesByUserId(id);
//        return mypagePictures;
//    }
    public List<MypagePictureViewDto> findAllByUser(String id) {
        User user = userRepository.findUserById(id).orElseThrow(() -> new IllegalArgumentException("해당하는 유저 리뷰가 없습니다."));
        List<MypagePicture> mypagePictures = user.getMypagePictures();
        return mypagePictures.stream().map(MypagePictureViewDto::new).collect(Collectors.toList());
    }

//    public MypagePictureViewDto getMypagePictures(String id) throws Exception {
//        List<MypagePicture> mypagePicture = mypagePictureRepository.findMypagePicturesByUserId(id);
////        MypagePictureViewDto mypagePictureViewDto = new MypagePictureViewDto();
////        mypagePictureViewDto.setRegion(mypagePicture.getregion().getDo_gwangyuksi());
////        mypagePictureViewDto.setId(mypagePicture.getPictureId());
////        mypagePictureViewDto.setPictureUrl(mypagePicture.getRealFileName());
////        return mypagePictureViewDto;
//        return mypagePicture;
//     }

    public MypageUpdateResponseDto mypagePictureUpdate(String id, MultipartFile mypagePicture, Long region_id) throws Exception {
        String keyFileName = "";
        InputStream keyFile = ResourceUtils.getURL("classpath:static/civil-forge-364402-29986bfb28c2.json").openStream();

        Storage storage = StorageOptions.newBuilder().setProjectId("BeTravelic")
                // Key 파일 수동 등록
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build().getService();


        Picture picture = null;
        User user = userRepository.findUserById(id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));
        String fileName = UUID.randomUUID().toString();
        String contentType = mypagePicture.getContentType();
        File file = null;
        if(contentType.contains("image/jpeg")){
            file = new File(IMAGE_PATH + fileName + ".jpg");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".jpg").build();
        }else if(contentType.contains("image/png")){
            file = new File(IMAGE_PATH + fileName + ".png");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".png").build();
        }else if(contentType.contains("image/gif")){
            file = new File(IMAGE_PATH + fileName + ".gif");
            picture = Picture.builder().fileName(fileName).realFileName(fileName + ".gif").build();
        }else{
            new RuntimeException("지원하는 사진 형식이 아닙니다");
        }
        File convertFile = convertMultiPartToFile( mypagePicture );
        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder("be_travelic", picture.getRealFileName())
                        .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                        .build());

        Blob blob = storage.createFrom(blobInfo, new FileInputStream(convertFile));


        MypagePicture myPicture = mypagePictureRepository.findByUserAndRegion(id, region_id).orElseThrow(() ->
                new RuntimeException("일치하는 사용자 없음"));

        myPicture.updateMypagePicture(picture.getRealFileName(), picture.getFileName());
        mypagePictureRepository.save(myPicture);
        MypageUpdateResponseDto mypageUpdateResponseDto = new MypageUpdateResponseDto();
        mypageUpdateResponseDto.setRealFileName(picture.getRealFileName());
        mypageUpdateResponseDto.setRegion_id(region_id);

        return mypageUpdateResponseDto;
    }



}
