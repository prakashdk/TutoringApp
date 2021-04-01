package com.example.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private AdminRepository adminRepository;

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
    @RequestMapping("/adminLogin")
    public boolean adminLogin(@RequestParam(name = "email") String email, @RequestParam(name = "password") String password){
        try{
            return adminRepository.findById(email).get().getPassword().equals(password);
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
    @RequestMapping(value = "/addRate",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public String addRate(@RequestBody Answer answer){
        try{
            Answer a=answerRepository.findById(answer.getId()).get();
            int r=a.getRating();
            int d=r>0?2:1;
            answer.setRating((answer.getRating()+r)/d);
            answerRepository.save(answer);
            return "rated";
        }
        catch (Exception e){
            return "failed";
        }
    }
    @RequestMapping(value = "/addAdmin",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public String addAdmin(@RequestBody Admin admin){
        try{
            //Admin a=new Admin();
            //a.setEmail(admin.getEmail());
            //a.setPassword(admin.getPassword());
            adminRepository.save(admin);
            return "added";
        }
        catch (Exception e){
            System.out.println(e);
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

    @RequestMapping("/allUsers")
    public Iterable<Tag> getUsers(){
        try{
            ArrayList<Tag> tagList=new ArrayList<Tag>();
            for (User u:userRepository.findAll()){
                if(adminRepository.existsById(u.getEmail())){
                    tagList.add(new Tag(u,"admin"));
                }
                else{
                    tagList.add(new Tag(u,"user"));
                }
            }
            return tagList;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return new ArrayList<Tag>();
    }

    @RequestMapping("/chart")
    public Chart getStats(){
        try{
            Chart chart=new Chart();
            chart.setQuestions(questionRepository.count());
            chart.setAnswers(answerRepository.count());
            int sum=0,c=0;
            for (Answer answer:answerRepository.findAll()){
                sum+=answer.getRating();
                if(answer.getRating()>0){
                    c++;
                }
            }
            chart.setRating(sum/c);
            return chart;
        }
        catch (Exception e){
            System.out.println(e);
        }
        return new Chart();
    }



}
