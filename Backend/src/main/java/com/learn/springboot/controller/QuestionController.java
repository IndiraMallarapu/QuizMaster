package com.learn.springboot.controller;

import com.learn.springboot.Service.QuestionService;
import com.learn.springboot.entity.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService qs;

    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){

        return qs.getAllQuestions();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> findQuestionByCategory(@PathVariable String category){
        return qs.findQuestionByCategory(category);
    }

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question){
        return qs.addQuestion(question);
    }
}
