package beTravelic.demo.global.util.jwt;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
@RequiredArgsConstructor
public class AccessTokenInterceptor implements HandlerInterceptor {
    private final Logger log = LoggerFactory.getLogger(AccessTokenInterceptor.class);

    private final JwtProvider jwtProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        if(request.getMethod().equals("OPTIONS")) return true;
        log.debug("request URI : {} ", request.getRequestURI());
        log.debug("request Method : {} " , request.getMethod());
        if(request.getMethod().equals("POST") && request.getRequestURI().equals("/users")) return true;
        try {
            String accessToken = getAccessToken(request.getHeader(HttpHeaders.AUTHORIZATION));
            request.setAttribute("id", jwtProvider.getIdFromAccessToken(accessToken));
            return true;
        }catch (Exception e) {
            throw new InvalidAccessTokenException();
        }
    }

    private String getAccessToken(String authorization){
        return authorization.split(" ")[1];
    }
}
