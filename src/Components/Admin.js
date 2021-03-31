import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  const [render, setRender] = useState("");

  useEffect(() => {
    fetch("http://localhost:6065/all")
      .then((res) => res.json())
      .then((row) => {
        let others = [];
        row.map((r) => {
          others.push(r);
        });
        setQuestions(others);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [render]);

  const deleteAnswer = (id) => {
    fetch("http://localhost:6065/deleteAnswer?id=" + id)
      .then((res) => res.text())
      .then((r) => {
        if (r === "deleted") {
          setRender("done");
          setRender("");
        } else {
          alert("Failed/Unable to post Try again");
        }
      })
      .catch((e) => {
        alert("Failed/Unable to post Try again");
        console.log(e);
      });
  };
  const deleteQuestion = (id) => {
    fetch("http://localhost:6065/deleteQuestion?id=" + id)
      .then((res) => res.text())
      .then((r) => {
        if (r === "deleted") {
          setRender("done");
          setRender("");
        } else {
          alert("Failed/Unable to post Try again");
        }
      })
      .catch((e) => {
        alert("Failed/Unable to post Try again");
        console.log(e);
      });
  };

  const isEmpty = (a) => {
    return a === "" || a === null || a === undefined || a === "0" || a === 0;
  };

  return (
    <>
      <div>
        <div className="header">
          <h1>Welcome admin</h1>
        </div>
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
                            <Button
                              color="primary"
                              onClick={() => deleteAnswer(r.id)}
                            >
                              Delete
                            </Button>
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
                    <Button
                      color="primary"
                      onClick={() => deleteQuestion(row.question.id)}
                    >
                      Delete
                    </Button>
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
    </>
  );
}
