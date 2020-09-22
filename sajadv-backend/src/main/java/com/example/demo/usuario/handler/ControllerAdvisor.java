package com.example.demo.usuario.handler;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.demo.usuario.exception.CpfCadastroException;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
    		HttpHeaders headers, HttpStatus status, WebRequest request) {
    	
    	List<Error> violations = new ArrayList<Error>();
    	
		ex.getBindingResult().getFieldErrors().stream()
		.forEach(x ->  violations.add(new Error(x.getField(), x.getDefaultMessage())));        

        return new ResponseEntity<>(violations, headers, status);
	}
    
    @ExceptionHandler(CpfCadastroException.class)
    public ResponseEntity<?> handleConstraintViolationException(HttpServletRequest req, CpfCadastroException e) {

    	List<Error> violations = new ArrayList<Error>();
    	violations.add(new Error("cpf", e.getMessage()));

    	return new ResponseEntity<>(violations, HttpStatus.CONFLICT);
	}
    
    
}
