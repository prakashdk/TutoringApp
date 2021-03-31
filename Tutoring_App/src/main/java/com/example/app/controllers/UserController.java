package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@CrossOrigin(maxAge = 18800)
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @RequestMapping("")
    public String home(){
        return "Welcome Home";
    }

    @RequestMapping("/login")
    public boolean userLogin(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password){
        try{
            return userRepository.findById(email).get().getPassword().equals(password);
        }
        catch (Exception e){
            return false;
        }
    }
    @RequestMapping("/add")
    public String userAdd(@RequestParam(name = "email") String email, @RequestParam(name = "question") String question){
        try{
            Question q=new Question();
            q.setPostEmail(email);
            q.setQuestion(question);
            questionRepository.save(q);
            return "added";
        }
        catch (Exception e){
            return "failed";
        }
    }
    @RequestMapping("/addAnswer")
    public String addAnswer(@RequestParam(name = "email") String email, @RequestParam(name = "answer") String answer,@RequestParam(name = "qid") int qid){
        try{
            Answer a=new Answer();
            a.setAnsweredEmail(email);
            a.setQuestionId(qid);
            a.setAnswer(answer);
            a.setRating(0);
            answerRepository.save(a);
            return "added";
        }
        catch (Exception e){
            return "failed";
        }
    }
    @RequestMapping("/deleteAnswer")
    public String deleteAnswer(@RequestParam(name = "id") int id){
        try{

            answerRepository.deleteById(id);
            return "deleted";
        }
        catch (Exception e){
            return "failed";
        }
    }
    @RequestMapping("/deleteQuestion")
    public String deleteQuestion(@RequestParam(name = "id") int id){
        try{

            questionRepository.deleteById(id);
            return "deleted";
        }
        catch (Exception e){
            return "failed";
        }
    }

    @RequestMapping("/all")
    public ArrayList<Component> questions(){
        try{
            Iterable<Question> questions=questionRepository.findAll();
            Iterable<Answer> answers=answerRepository.findAll();
            ArrayList<Answer> answerList=new ArrayList<Answer>();
            ArrayList<Component> componentList=new ArrayList<Component>();
            for(Question question:questions){
                for (Answer answer:answers) {
                    if (answer.getQuestionId() == question.getId()) {
                        answerList.add(answer);
                    }
                }
                Component component=new Component(question,answerList);
                componentList.add(component);
                answerList=new ArrayList<Answer>();
            }
            return componentList;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return new ArrayList<Component>();
    }

}
