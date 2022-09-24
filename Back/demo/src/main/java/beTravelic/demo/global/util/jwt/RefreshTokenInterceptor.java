package beTravelic.demo.global.util.jwt;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class RefreshTokenInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().equals("OPTIONS")) return true;
        try {
            String refreshToken = getRefreshToken(request.getHeader(HttpHeaders.AUTHORIZATION));
            if(jwtProvider.isValidToken(refreshToken)) {
                request.setAttribute("refreshToken", refreshToken);
            }else{
                throw new InvalidRefreshTokenException();
            }
            return true;
        }catch (Exception e){
            throw new InvalidRefreshTokenException();
        }
    }

    private String getRefreshToken(String authorization){
        return authorization.split(" ")[1];
    }
}
