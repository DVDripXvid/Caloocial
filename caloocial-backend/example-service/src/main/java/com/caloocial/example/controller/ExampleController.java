package com.caloocial.example.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {

    @RequestMapping(method = RequestMethod.GET)
    public String getExample(){
        return "example";
    }

}
