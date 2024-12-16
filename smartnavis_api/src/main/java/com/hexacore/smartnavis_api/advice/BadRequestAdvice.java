package com.hexacore.smartnavis_api.advice;

import com.hexacore.smartnavis_api.exception.BadRequestException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Order(Integer.MIN_VALUE)
public class BadRequestAdvice {
    @ResponseBody
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String badRequestHandler(BadRequestException e) {
        return e.getMessage();
    }
}
