import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FormHelperText, TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
  card: {
    maxWidth: 1400,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [myQuestions, setMyQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [helper, setHelper] = useState("");
  const [render, setRender] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:6065/all")
      .then((res) => res.json())
      .then((row) => {
        let mine = [];
        let others = [];
        row.map((r) => {
          if (r.question.postEmail === sessionStorage.getItem("email")) {
            mine.push(r);
          } else {
            others.push(r);
          }
        });
        setMyQuestions(mine);
        setQuestions(others);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [render]);

  const handleAnswer = (id) => {
    if (isEmpty(answer)) {
      setHelper("Enter valid answer");
    } else {
      fetch(
        "http://localhost:6065/addAnswer?email=" +
          sessionStorage.getItem("email") +
          "&answer=" +
          answer +
          "&qid=" +
          id
      )
        .then((res) => res.text())
        .then((r) => {
          if (r === "added") {
            setAnswer("");
            setRender(true);
            setRender(false);
          } else {
            setHelper("Failed/Unable to post Try again");
          }
        })
        .catch((e) => {
          setHelper("Failed/Unable to post Try again");
          console.log(e);
        });
    }
  };

  const isEmpty = (a) => {
    return a === "" || a === null || a === undefined || a === "0" || a === 0;
  };

  const addUser = () => {
    history.push("/add");
  };

  return (
    <>
      <h1></h1>
      <div className="button">
        <Button variant="outlined" color="primary" onClick={addUser}>
          <b>Add Question</b>
        </Button>
      </div>
      <div>
        <div className="header">
          <h1>Your questions</h1>
        </div>
        {myQuestions.length > 0 ? (
          <ul>
            {myQuestions.map((row) => (
              <>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                      {row.question.question}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="p">
                      Posted by you
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Answers:
                    </Typography>
                    {row.answerList.length > 0 ? (
                      row.answerList.map((r) => (
                        <>
                          <Card className={classes.root}>
                            <CardContent>
                              <Typography variant="h5" component="h2">
                                {r.answer}
                              </Typography>
                              <Typography
                                className={classes.pos}
                                color="textSecondary"
                              >
                                posted by {r.answeredEmail}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button color="primary">Rate</Button>
                            </CardActions>
                          </Card>
                          <h1></h1>
                        </>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        No answers
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button color="primary">Delete</Button>
                  </CardActions>
                </Card>
                <h1></h1>
              </>
            ))}
          </ul>
        ) : (
          <h1>No Questions Asked</h1>
        )}
      </div>
      <div className="header">
        <h1>Available questions</h1>
      </div>
      <div>
        {questions.length > 0 ? (
          <ul>
            {questions.map((row) => (
              <>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">
                      {row.question.question}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="p">
                      Posted by {row.question.postEmail}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Answers:
                    </Typography>
                    {row.answerList.length > 0 ? (
                      row.answerList.map((r) => (
                        <>
                          <Card className={classes.root}>
                            <CardContent>
                              <Typography variant="h5" component="h2">
                                {r.answer}
                              </Typography>
                              <Typography
                                className={classes.pos}
                                color="textSecondary"
                              >
                                posted by {r.answeredEmail}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button color="primary">Rate</Button>
                            </CardActions>
                          </Card>
                          <h1></h1>
                        </>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        No answers
                      </Typography>
                    )}
                  </CardContent>
                  <TextareaAutosize
                    aria-label="minimum height"
                    rowsMin={3}
                    style={{ width: "300px" }}
                    placeholder="Enter Answer"
                    onFocus={() => {
                      setHelper("");
                    }}
                    value={answer}
                    onChange={(event) => {
                      setAnswer(event.target.value);
                    }}
                  />
                  <FormHelperText error>{helper}</FormHelperText>
                  <CardActions>
                    <Button
                      color="primary"
                      onClick={() => handleAnswer(row.question.id)}
                    >
                      Add answer
                    </Button>
                  </CardActions>
                </Card>
                <h1></h1>
              </>
            ))}
          </ul>
        ) : (
          <h1>No Questions Available</h1>
        )}
      </div>
    </>
  );
}
