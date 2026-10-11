package com.learn.springboot.Service;

import com.learn.springboot.dao.QuestionDao;
import com.learn.springboot.dao.QuizDao;
import com.learn.springboot.entity.Question;
import com.learn.springboot.entity.QuestionWrapper;
import com.learn.springboot.entity.Quiz;
import com.learn.springboot.entity.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizDao qzd;
    @Autowired
    QuestionDao qd;
    public ResponseEntity<Integer> createQuiz(String category, int numq, String title) {
        List<Question> qs=qd.findRandomQsByCategory(category,numq);
        Quiz qz =new Quiz();
        qz.setTitle(title);
        qz.setQs(qs);
        qzd.save(qz);
        return new ResponseEntity<Integer>(qz.getId(), HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> qz=qzd.findById(id);
        if(qz.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        List<Question> qfd=qz.get().getQs();
        List<QuestionWrapper> qfu=new ArrayList<>();
        for(Question q : qfd){
            QuestionWrapper qw=new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
            qfu.add(qw);
        }
        return new ResponseEntity<>(qfu,HttpStatus.OK);
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        Optional<Quiz> quiz= qzd.findById(id);
        if(quiz.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Quiz qz = quiz.get();
        List<Question> qs=qz.getQs();
        int ryt=0;
        for(Response response : responses){
            for(Question ques: qs){
                if (ques.getId().equals(response.getId())){
                    if(ques.getRightAnswer()!=null && ques.getRightAnswer().trim().equalsIgnoreCase(response.getResponse()==null?"":response.getResponse().trim())){
                        ryt++;
                    }
                    break;
                }
            }
        }
        return new ResponseEntity<>(ryt,HttpStatus.OK);
    }
}
