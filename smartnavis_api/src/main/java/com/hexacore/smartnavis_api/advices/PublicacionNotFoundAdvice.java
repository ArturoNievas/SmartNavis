package com.hexacore.smartnavis_api.advices;

import com.hexacore.smartnavis_api.exceptions.PublicacionNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PublicacionNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PublicacionNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String publicacionNotFoundHandler(PublicacionNotFoundException e) {
        return e.getMessage();
    }
}
