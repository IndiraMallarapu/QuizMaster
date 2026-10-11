package com.learn.springboot.controller;

import com.learn.springboot.Service.QuizService;
import com.learn.springboot.entity.Question;
import com.learn.springboot.entity.QuestionWrapper;

import com.learn.springboot.entity.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("Quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    private QuizService qzs;
    public QuizController(QuizService qzs) {
        this.qzs = qzs;
    }
    @PostMapping("Create")
    public ResponseEntity<Integer> createQuiz(@RequestParam String category,@RequestParam int numq,@RequestParam String title){
        return qzs.createQuiz(category,numq,title);
    }
    @GetMapping("quiz/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return qzs.getQuizQuestions(id);
    }

    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id, @RequestBody List<Response> responses){
        return qzs.calculateResult(id,responses);
    }
}
