package com.example.app.controllers;

import java.util.ArrayList;

public class Component {

    private Question question;
    private ArrayList<Answer> answerList;

    public Component(Question question, ArrayList<Answer> answerList) {
        this.question = question;
        this.answerList = answerList;
    }
    public Component() {

    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public ArrayList<Answer> getAnswerList() {
        return answerList;
    }

    public void setAnswerList(ArrayList<Answer> answerList) {
        this.answerList = answerList;
    }
}
