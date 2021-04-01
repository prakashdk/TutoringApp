import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from 'prop-types';
import {
  FormHelperText,
  TextareaAutosize,
  Modal,
  Paper,
} from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Home() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [myQuestions, setMyQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [helper, setHelper] = useState("");
  const [render, setRender] = useState(false);
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});

  const [val, setVal] = React.useState("one");

  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRate = (a) => {
    setData(a);
    handleOpen();
  };

  const setRate = () => {
    let obj = data;
    obj.rating = value;
    setData(obj);
    fetch("http://localhost:6065/addRate", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        setRender(true);
        setRender(false);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleClose();
    setRender(true);
    setRender(false);
  };

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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <>
        <Typography component="legend">Rating:</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />

        <Button color="primary" onClick={() => setRate()}>
          Rate
        </Button>
      </>
    </div>
  );
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

  return (
    <>
      <h1></h1>
      <div className="button">
        <Button variant="outlined" color="primary" onClick={addUser}>
          <b>Add Question</b>
        </Button>
      </div>
      <div>
        <Paper square>
          <Tabs
            value={val}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab value="one" label="Your Questions" />
            <Tab value="two" label="Available Questions" />
          </Tabs>
        </Paper>
        <TabPanel value={val} index="one">
          <div>
            {myQuestions.length > 0 ? (
              <ul>
                {myQuestions.map((row) => (
                  <React.Fragment key={row.question.id}>
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
                            <React.Fragment key={r.id}>
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
                                  <Button
                                    color="primary"
                                    onClick={() => handleRate(r)}
                                  >
                                    Rate
                                  </Button>
                                  <Box
                                    component="fieldset"
                                    mb={3}
                                    borderColor="transparent"
                                  >
                                    <Typography component="legend">
                                      Rating:
                                    </Typography>
                                    <Rating
                                      name="read-only"
                                      value={r.rating}
                                      readOnly
                                    />
                                  </Box>
                                </CardActions>
                              </Card>
                              <h1></h1>
                            </React.Fragment>
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
                  </React.Fragment>
                ))}
              </ul>
            ) : (
              <h1>No Questions Asked</h1>
            )}
          </div>
        </TabPanel>
        <TabPanel value={val} index="two">
          <div>
            {questions.length > 0 ? (
              <ul>
                {questions.map((row, index) => (
                  <React.Fragment key={row.question.id}>
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
                            <React.Fragment key={r.id}>
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
                                  <Button
                                    color="primary"
                                    onClick={() => handleRate(r)}
                                  >
                                    Rate
                                  </Button>
                                  <Box
                                    component="fieldset"
                                    mb={3}
                                    borderColor="transparent"
                                  >
                                    <Typography component="legend">
                                      Rating:
                                    </Typography>
                                    <Rating
                                      name="read-only"
                                      value={r.rating}
                                      readOnly
                                    />
                                  </Box>
                                </CardActions>
                              </Card>
                              <h1></h1>
                            </React.Fragment>
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
                  </React.Fragment>
                ))}
              </ul>
            ) : (
              <h1>No Questions Available</h1>
            )}
          </div>
        </TabPanel>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}