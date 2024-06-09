package com.hexacore.smartnavis_api.advice;

import com.hexacore.smartnavis_api.exception.UnauthorizedException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Order(Integer.MIN_VALUE)
public class UnauthorizedAdvice {
    @ResponseBody
    @ExceptionHandler(value = {UnauthorizedException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    String unauthorizedHandler(UnauthorizedException e) {
        return e.getMessage();
    }
}
