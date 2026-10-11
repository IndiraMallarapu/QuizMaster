package com.learn.springboot.dao;

import com.learn.springboot.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question,Integer> {


    List<Question> findQuestionByCategory(String category);
    @Query(value = "SELECT * FROM question q where q.category = :category ORDER BY random() LIMIT :numq", nativeQuery = true)
    List<Question> findRandomQsByCategory(@Param("category") String category, @Param("numq")  int numq);
}
