package com.example.app.controllers;

import javax.persistence.*;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "answered_email")
    private String answeredEmail;

    @Column(name = "question_id")
    private int questionId;

    @Column(name = "answer")
    private String answer;

    @Column(name = "rating")
    private int rating;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAnsweredEmail() {
        return answeredEmail;
    }

    public void setAnsweredEmail(String answeredEmail) {
        this.answeredEmail = answeredEmail;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }



    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
