package com.app.backend.exceptions;

public class ServerErrorExceptionHandler extends RuntimeException{
    public ServerErrorExceptionHandler(String message){
        super(message);
    }
}
