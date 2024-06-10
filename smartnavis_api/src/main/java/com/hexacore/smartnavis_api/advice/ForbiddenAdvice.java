package com.hexacore.smartnavis_api.advice;

import com.hexacore.smartnavis_api.exception.ForbiddenException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Order(Integer.MIN_VALUE)
public class ForbiddenAdvice {
    @ResponseBody
    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String forbiddenHandler(ForbiddenException e) {
        return e.getMessage();
    }
}
